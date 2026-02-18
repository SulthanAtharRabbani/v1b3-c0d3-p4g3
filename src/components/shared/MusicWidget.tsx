'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Music, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  X, ListMusic, History, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { usePlayback, TRACKS, Track } from '@/lib/playback-context';

// Format time helper
function formatTime(time: number) {
  if (!time || !isFinite(time)) return '0:00';
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Spotify icon
function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

const SPOTIFY_HISTORY_KEY = 'eduhub-spotify-history';
const LAST_SPOTIFY_KEY = 'eduhub-last-spotify';

// Extract display name from Spotify URL
function getSpotifyDisplayName(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    if (pathParts.length >= 3) {
      // URL format: /{type}/{id} or /embed/{type}/{id}
      const typeIndex = pathParts[0] === 'embed' ? 1 : 0;
      const type = pathParts[typeIndex] || 'unknown';
      const id = pathParts[typeIndex + 1] || '';
      
      // Show truncated ID
      const shortId = id.length > 12 ? id.slice(0, 12) + '...' : id;
      return `${type}/${shortId}`;
    }
    return url.slice(0, 30) + (url.length > 30 ? '...' : '');
  } catch {
    return url.slice(0, 30) + (url.length > 30 ? '...' : '');
  }
}

export function MusicWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState<'tracks' | 'spotify'>('tracks');
  const [spotifyInput, setSpotifyInput] = useState('');
  const [spotifyHistory, setSpotifyHistory] = useState<string[]>([]);
  
  // Last Spotify info
  const [lastSpotifyInfo, setLastSpotifyInfo] = useState<{ url: string; displayName: string } | null>(null);
  
  // Drag state for progress bar
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const wasPlayingBeforeDrag = useRef(false);
  
  // Drag state for volume
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);
  
  const {
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
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
  } = usePlayback();

  // Load Spotify history and last played from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(SPOTIFY_HISTORY_KEY);
      if (savedHistory) {
        queueMicrotask(() => setSpotifyHistory(JSON.parse(savedHistory)));
      }
      
      const savedLast = localStorage.getItem(LAST_SPOTIFY_KEY);
      if (savedLast) {
        const parsed = JSON.parse(savedLast);
        queueMicrotask(() => setLastSpotifyInfo(parsed));
      }
    } catch {
      // ignore
    }
  }, []);

  // Handle track click
  const handleTrackClick = (track: Track) => {
    playTrack(track);
  };

  // Handle Spotify submit
  const handleSpotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (spotifyInput.trim()) {
      const url = spotifyInput.trim();
      playSpotify(url);
      setSpotifyInput('');
      
      // Save to history
      const embedUrl = url.includes('open.spotify.com') 
        ? url.replace('open.spotify.com', 'open.spotify.com/embed').split('?')[0]
        : url;
      
      setSpotifyHistory(prev => {
        const filtered = prev.filter(u => u !== embedUrl);
        const updated = [embedUrl, ...filtered].slice(0, 5);
        localStorage.setItem(SPOTIFY_HISTORY_KEY, JSON.stringify(updated));
        return updated;
      });
      
      // Save as last played with display name
      const displayName = getSpotifyDisplayName(embedUrl);
      const lastInfo = { url: embedUrl, displayName };
      setLastSpotifyInfo(lastInfo);
      localStorage.setItem(LAST_SPOTIFY_KEY, JSON.stringify(lastInfo));
    }
  };

  // Play from history
  const playFromHistory = (url: string) => {
    playSpotify(url);
    
    // Save as last played with display name
    const displayName = getSpotifyDisplayName(url);
    const lastInfo = { url, displayName };
    setLastSpotifyInfo(lastInfo);
    localStorage.setItem(LAST_SPOTIFY_KEY, JSON.stringify(lastInfo));
  };

  // Play last Spotify URL
  const playLastSpotify = () => {
    if (lastSpotifyInfo?.url) {
      playSpotify(lastSpotifyInfo.url);
    }
  };

  // Clear history
  const clearHistory = () => {
    setSpotifyHistory([]);
    localStorage.removeItem(SPOTIFY_HISTORY_KEY);
  };

  // Calculate progress percentage
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayProgressPct = isDraggingProgress ? dragProgress : progressPct;

  // Handle progress bar mouse down (start drag)
  const handleProgressMouseDown = useCallback((e: React.MouseEvent) => {
    if (!progressRef.current || currentSource.type !== 'track') return;
    
    e.preventDefault();
    setIsDraggingProgress(true);
    
    wasPlayingBeforeDrag.current = isPlaying;
    
    if (isPlaying) {
      const audio = document.querySelector('audio');
      if (audio) audio.pause();
    }
    
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setDragProgress(pct);
  }, [isPlaying, currentSource.type]);

  // Handle volume bar mouse down (start drag)
  const handleVolumeMouseDown = useCallback((e: React.MouseEvent) => {
    if (!volumeRef.current) return;
    
    e.preventDefault();
    setIsDraggingVolume(true);
    
    const rect = volumeRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setVolume(pct);
  }, [setVolume]);

  // Global mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingProgress && progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        setDragProgress(pct);
      }
      
      if (isDraggingVolume && volumeRef.current) {
        const rect = volumeRef.current.getBoundingClientRect();
        const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        setVolume(pct);
      }
    };

    const handleMouseUp = () => {
      if (isDraggingProgress) {
        setIsDraggingProgress(false);
        
        const newTime = (dragProgress / 100) * duration;
        seek(newTime);
        
        if (wasPlayingBeforeDrag.current) {
          const audio = document.querySelector('audio');
          if (audio) audio.play().catch(console.error);
        }
      }
      
      if (isDraggingVolume) {
        setIsDraggingVolume(false);
      }
    };

    if (isDraggingProgress || isDraggingVolume) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingProgress, isDraggingVolume, dragProgress, duration, seek, setVolume]);

  // Show Spotify iframe when Spotify is active
  const showSpotifyIframe = currentSource.type === 'spotify' && currentSource.spotifyUrl;
  const isSpotifyActive = currentSource.type === 'spotify';

  return (
    <div className="fixed bottom-16 left-4 z-40">
      {/* Always render both but toggle visibility to keep Spotify iframe alive */}
      
      {/* Collapsed / Mini view - visible when not expanded */}
      <div className={isExpanded ? 'hidden' : 'block'}>
        <div className="flex items-center gap-1">
          {/* Play/Pause button */}
          <button
            onClick={() => {
              if (isSpotifyActive) {
                // Spotify can't be controlled from collapsed - just expand
                setIsExpanded(true);
              } else if (currentSource.type === 'none' && lastSpotifyInfo) {
                // No current source but have last Spotify - play it
                playSpotify(lastSpotifyInfo.url);
              } else {
                togglePlayPause();
              }
            }}
            disabled={isLoading || (currentSource.type === 'none' && !lastSpotifyInfo)}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-70",
              isSpotifyActive || (currentSource.type === 'none' && lastSpotifyInfo)
                ? "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                : "bg-gradient-to-br from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-white animate-spin" />
            ) : isSpotifyActive ? (
              // For Spotify, always show Spotify icon (indicates it's not controllable from here)
              <SpotifyIcon className="h-5 w-5 text-white" />
            ) : currentSource.type === 'track' ? (
              isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white ml-0.5" />
              )
            ) : lastSpotifyInfo ? (
              <SpotifyIcon className="h-5 w-5 text-white" />
            ) : (
              <Music className="h-5 w-5 text-white" />
            )}
          </button>
          
          {/* Track info - click to expand */}
          <div 
            className="flex items-center gap-2 px-3 py-2 bg-card border rounded-full shadow-lg cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            {isSpotifyActive ? (
              <SpotifyIcon className="h-4 w-4 text-green-500 shrink-0" />
            ) : null}
            <span className="text-xs font-medium max-w-[100px] truncate">
              {isLoading ? 'Loading...' : currentSource.title || (lastSpotifyInfo ? lastSpotifyInfo.displayName : 'No track')}
            </span>
            {currentSource.type === 'track' && duration > 0 && (
              <span className="text-[10px] text-muted-foreground">
                {formatTime(currentTime)}
              </span>
            )}
            <ListMusic className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          
          {/* Progress bar on mini - for tracks only */}
          {currentSource.type === 'track' && duration > 0 && (
            <div 
              ref={progressRef}
              className="w-16 h-1.5 bg-muted rounded-full cursor-pointer select-none hidden sm:block"
              onMouseDown={handleProgressMouseDown}
            >
              <div 
                className="h-full bg-violet-500 rounded-full"
                style={{ width: `${displayProgressPct}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Expanded view - visible when expanded, but ALWAYS in DOM for Spotify */}
      <div className={isExpanded ? 'block' : 'hidden'}>
        <div className="w-80 bg-card border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-violet-500" />
              <span className="font-medium text-sm">Music</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => setIsExpanded(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Now Playing info */}
          <div className="p-3 border-b">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br",
                isSpotifyActive ? "from-green-500 to-green-600" : "from-violet-500 to-fuchsia-500"
              )}>
                {currentSource.type === 'spotify' ? (
                  <SpotifyIcon className="h-6 w-6 text-white" />
                ) : isLoading ? (
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                ) : isPlaying ? (
                  <div className="flex gap-0.5 items-end">
                    <span className="w-0.5 h-3 bg-white rounded-full animate-pulse" />
                    <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '75ms' }} />
                    <span className="w-0.5 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  </div>
                ) : (
                  <Music className="h-6 w-6 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {currentSource.title || (lastSpotifyInfo ? lastSpotifyInfo.displayName : 'No track')}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {isLoading ? 'Loading...' : currentSource.subtitle || (lastSpotifyInfo ? 'Click to resume' : '')}
                </p>
              </div>
            </div>

            {/* Progress Bar & Controls - for tracks only */}
            {currentSource.type === 'track' && duration > 0 && (
              <div className="mt-3">
                <div 
                  ref={progressRef}
                  className="h-1.5 bg-muted rounded-full cursor-pointer select-none"
                  onMouseDown={handleProgressMouseDown}
                >
                  <div 
                    className="h-full bg-violet-500 rounded-full transition-[width] duration-75"
                    style={{ width: `${displayProgressPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>{formatTime(isDraggingProgress ? (dragProgress / 100) * duration : currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}

            {/* Controls - for tracks only */}
            {currentSource.type === 'track' && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={playPrevious} disabled={isLoading}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  className="h-10 w-10 rounded-full bg-violet-500 hover:bg-violet-600" 
                  onClick={togglePlayPause}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={playNext} disabled={isLoading}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Spotify iframe - same position as track controls */}
            {showSpotifyIframe && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <iframe
                  key={currentSource.spotifyUrl}
                  src={`${currentSource.spotifyUrl}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media"
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Volume - only for tracks */}
          {currentSource.type === 'track' && (
            <div className="flex items-center gap-2 px-3 py-2 border-b">
              <button className="h-6 w-6 flex items-center justify-center" onClick={toggleMute}>
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-3.5 w-3.5" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
              </button>
              <div 
                ref={volumeRef}
                className="flex-1 h-1.5 bg-muted rounded-full cursor-pointer select-none"
                onMouseDown={handleVolumeMouseDown}
              >
                <div 
                  className="h-full bg-foreground rounded-full transition-[width] duration-75"
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-6 text-right">{Math.round(volume)}%</span>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b">
            {[
              { id: 'tracks' as const, icon: ListMusic, label: 'Tracks' },
              { id: 'spotify' as const, icon: null, label: 'Spotify' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'flex-1 py-2 flex items-center justify-center gap-1 transition-colors',
                  tab === t.id ? 'text-violet-600 border-b-2 border-violet-500' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.icon ? <t.icon className="h-4 w-4" /> : <SpotifyIcon className="h-4 w-4" />}
                <span className="text-xs">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="max-h-48 overflow-y-auto">
            {/* Tracks */}
            {tab === 'tracks' && (
              <div>
                {TRACKS.map((track, i) => (
                  <div
                    key={track.id}
                    onClick={() => handleTrackClick(track)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 hover:bg-muted/50 transition-colors cursor-pointer',
                      currentSource.type === 'track' && currentSource.id === track.id && 'bg-muted/50'
                    )}
                  >
                    <div className={cn(
                      'w-5 h-5 rounded flex items-center justify-center text-[10px]',
                      currentSource.type === 'track' && currentSource.id === track.id 
                        ? 'bg-violet-500 text-white' 
                        : 'bg-muted'
                    )}>
                      {currentSource.type === 'track' && currentSource.id === track.id && (isLoading || isPlaying) ? (
                        isLoading ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <span className="flex gap-0.5 items-end">
                            <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
                            <span className="w-0.5 h-1.5 bg-white rounded-full animate-pulse" />
                          </span>
                        )
                      ) : (
                        i + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{track.title}</p>
                      <p className="text-[10px] text-muted-foreground">{track.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Spotify */}
            {tab === 'spotify' && (
              <div className="p-3 space-y-3">
                {/* Quick play last Spotify URL */}
                {!showSpotifyIframe && lastSpotifyInfo && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SpotifyIcon className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-xs font-medium text-green-600 dark:text-green-400">Last Played</p>
                          <p className="text-[10px] text-muted-foreground truncate max-w-[180px] font-mono">
                            {lastSpotifyInfo.displayName}
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="h-7 bg-green-500 hover:bg-green-600 text-white"
                        onClick={playLastSpotify}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Play
                      </Button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSpotifySubmit} className="flex gap-2">
                  <Input 
                    placeholder="Paste Spotify URL..." 
                    value={spotifyInput} 
                    onChange={e => setSpotifyInput(e.target.value)} 
                    className="h-8 text-xs" 
                  />
                  <Button type="submit" size="sm" className="h-8">Play</Button>
                </form>
                <p className="text-[10px] text-muted-foreground">
                  Paste any track, album, or playlist URL
                </p>
                
                {/* History */}
                {spotifyHistory.length > 0 && (
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <History className="h-3 w-3" />
                        Recent
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-5 text-[10px] px-1" 
                        onClick={clearHistory}
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {spotifyHistory.map((url, i) => (
                        <button
                          key={i}
                          onClick={() => playFromHistory(url)}
                          className={cn(
                            'w-full text-left px-2 py-1.5 rounded text-xs truncate hover:bg-muted/50 transition-colors',
                            currentSource.type === 'spotify' && currentSource.spotifyUrl === url && 'bg-muted/50'
                          )}
                        >
                          <SpotifyIcon className="h-3 w-3 inline mr-1 text-green-500" />
                          <span className="font-mono">{getSpotifyDisplayName(url)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
