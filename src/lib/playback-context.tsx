'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from 'react';

// Track type
export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
}

// Source type
export type SourceType = 'none' | 'track' | 'spotify';

// Playback context type
type PlaybackContextType = {
  // State
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  tracks: Track[]; // Dynamic tracks from folder
  currentSource: {
    type: SourceType;
    id: string;
    title: string;
    subtitle: string;
    spotifyUrl?: string;
  };
  
  // Actions
  togglePlayPause: () => void;
  playTrack: (track: Track) => void;
  playSpotify: (url: string) => void;
  stopPlayback: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  playNext: () => void;
  playPrevious: () => void;
  refreshTracks: () => void; // Refresh track list
  
  // Refs
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export function PlaybackProvider({ children }: { children: ReactNode }) {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [volume, setVolumeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('music-volume');
      return saved ? parseInt(saved) : 70;
    }
    return 70;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [currentSource, setCurrentSource] = useState<{
    type: SourceType;
    id: string;
    title: string;
    subtitle: string;
    spotifyUrl?: string;
  }>({
    type: 'none',
    id: '',
    title: 'No track',
    subtitle: '',
  });
  
  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadRequestIdRef = useRef(0);
  const tracksRef = useRef<Track[]>([]); // Keep tracks in ref for event handlers
  const currentSourceIdRef = useRef(''); // Keep current source id in ref for event handlers
  const playTrackRef = useRef<((track: Track) => void) | null>(null); // Keep playTrack in ref
  
  // Keep tracksRef in sync
  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);
  
  // Keep currentSourceIdRef in sync
  useEffect(() => {
    currentSourceIdRef.current = currentSource.id;
  }, [currentSource.id]);
  
  // Save volume to localStorage
  useEffect(() => {
    localStorage.setItem('music-volume', volume.toString());
  }, [volume]);

  // Fetch tracks from API
  const refreshTracks = useCallback(async () => {
    try {
      const res = await fetch('/api/music');
      const data = await res.json();
      if (data.tracks) {
        setTracks(data.tracks);
      }
    } catch (error) {
      console.error('Failed to fetch tracks:', error);
    }
  }, []);

  // Fetch tracks on mount
  useEffect(() => {
    // Use queueMicrotask to avoid synchronous setState in effect
    queueMicrotask(() => refreshTracks());
  }, [refreshTracks]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (currentSource.type === 'spotify') {
      // Spotify controls its own playback via iframe
      setIsPlaying(prev => !prev);
      return;
    }
    
    const audio = audioRef.current;
    if (!audio || currentSource.type !== 'track') return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isPlaying, currentSource.type]);

  // Play a track - this WILL stop Spotify since we're playing a track
  const playTrack = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Increment request ID to invalidate any pending loads
    const requestId = ++loadRequestIdRef.current;
    
    // Stop current audio playback immediately
    audio.pause();
    
    // Set loading state
    setIsLoading(true);
    
    // Set new source
    audio.src = track.src;
    
    // Define the play handler
    const handleCanPlay = () => {
      if (requestId !== loadRequestIdRef.current) {
        return;
      }
      
      audio.play()
        .then(() => {
          if (requestId === loadRequestIdRef.current) {
            setIsPlaying(true);
            setIsLoading(false);
            setCurrentSource({
              type: 'track',
              id: track.id,
              title: track.title,
              subtitle: track.artist,
            });
          }
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.error('Play error:', err);
          }
          if (requestId === loadRequestIdRef.current) {
            setIsLoading(false);
          }
        });
      
      audio.removeEventListener('canplay', handleCanPlay);
    };
    
    audio.addEventListener('canplay', handleCanPlay);
    audio.load();
  }, []);

  // Keep playTrackRef in sync (must be after playTrack declaration)
  useEffect(() => {
    playTrackRef.current = playTrack;
  }, [playTrack]);

  // Play Spotify - this WILL stop any playing track
  const playSpotify = useCallback((url: string) => {
    // Stop audio track
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Increment request ID to invalidate any pending track loads
    loadRequestIdRef.current++;
    
    // Convert URL to embed
    let embedUrl = url;
    if (url.includes('open.spotify.com')) {
      embedUrl = url.replace('open.spotify.com', 'open.spotify.com/embed').split('?')[0];
    }
    
    setCurrentSource({
      type: 'spotify',
      id: url,
      title: 'Spotify',
      subtitle: 'Playing from Spotify',
      spotifyUrl: embedUrl,
    });
    setIsPlaying(true);
    setIsLoading(false);
  }, []);

  // Stop playback
  const stopPlayback = useCallback(() => {
    loadRequestIdRef.current++;
    
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    }
    setIsPlaying(false);
    setIsLoading(false);
    setCurrentTime(0);
    setDuration(0);
    setCurrentSource({
      type: 'none',
      id: '',
      title: 'No track',
      subtitle: '',
    });
  }, []);

  // Seek
  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  // Set volume
  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v / 100;
    }
    if (v > 0) setIsMuted(false);
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (audioRef.current) {
        audioRef.current.volume = newMuted ? 0 : volume / 100;
      }
      return newMuted;
    });
  }, [volume]);

  // Play next track
  const playNext = useCallback(() => {
    if (currentSource.type !== 'track') return;
    
    const currentTracks = tracksRef.current;
    if (currentTracks.length === 0) return;
    
    const idx = currentTracks.findIndex(t => t.id === currentSource.id);
    const nextIdx = (idx + 1) % currentTracks.length;
    playTrack(currentTracks[nextIdx]);
  }, [currentSource, playTrack]);

  // Play previous track
  const playPrevious = useCallback(() => {
    if (currentSource.type !== 'track') return;
    
    const currentTracks = tracksRef.current;
    if (currentTracks.length === 0) return;
    
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      return;
    }
    
    const idx = currentTracks.findIndex(t => t.id === currentSource.id);
    const prevIdx = (idx - 1 + currentTracks.length) % currentTracks.length;
    playTrack(currentTracks[prevIdx]);
  }, [currentSource, currentTime, playTrack]);

  // Audio event listeners
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume / 100;
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      const currentTracks = tracksRef.current;
      const currentId = currentSourceIdRef.current;
      const playTrackFn = playTrackRef.current;
      
      if (currentTracks.length === 0 || !playTrackFn) {
        setIsPlaying(false);
        return;
      }
      
      const idx = currentTracks.findIndex(t => t.id === currentId);
      if (idx !== -1) {
        // Auto-play next track, loop back to first if at end
        const nextIdx = (idx + 1) % currentTracks.length;
        setTimeout(() => {
          playTrackFn(currentTracks[nextIdx]);
        }, 100);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Update volume on audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  return (
    <PlaybackContext.Provider
      value={{
        isPlaying,
        isLoading,
        currentTime,
        duration,
        volume,
        isMuted,
        tracks,
        currentSource,
        togglePlayPause,
        playTrack,
        playSpotify,
        stopPlayback,
        seek,
        setVolume,
        toggleMute,
        playNext,
        playPrevious,
        refreshTracks,
        audioRef,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const context = useContext(PlaybackContext);
  if (context === undefined) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
}
