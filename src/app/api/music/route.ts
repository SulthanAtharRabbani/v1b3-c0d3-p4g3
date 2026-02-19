import { NextResponse } from 'next/server';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Supported audio formats
const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.flac', '.aac', '.webm', '.opus'];

// Format filename to title
function formatTitle(filename: string): string {
  // Remove extension
  const name = filename.replace(/\.[^/.]+$/, '');
  // Replace dashes/underscores with spaces
  const formatted = name.replace(/[-_]/g, ' ');
  // Capitalize words
  return formatted.replace(/\b\w/g, c => c.toUpperCase());
}

export async function GET() {
  try {
    const musicDir = join(process.cwd(), 'public', 'music');
    
    // Check if directory exists
    let files: string[] = [];
    try {
      files = readdirSync(musicDir);
    } catch {
      // Directory doesn't exist yet
      return NextResponse.json({ tracks: [] });
    }
    
    // Filter audio files
    const audioFiles = files.filter(file => {
      const ext = file.toLowerCase().slice(file.lastIndexOf('.'));
      return AUDIO_EXTENSIONS.includes(ext);
    });
    
    // Create track list
    const tracks = audioFiles.map((file, index) => ({
      id: `t${index + 1}`,
      title: formatTitle(file),
      artist: 'Local',
      src: `/music/${file}`,
    }));
    
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error scanning music folder:', error);
    return NextResponse.json({ tracks: [], error: 'Failed to scan music folder' }, { status: 500 });
  }
}
