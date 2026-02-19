import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { MusicWidget } from '@/components/shared/MusicWidget';
import { PomodoroWidget } from '@/components/shared/PomodoroWidget';
import { PlaybackProvider } from '@/lib/playback-context';
import { CoursesProvider } from '@/lib/courses-context';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
};

export const metadata: Metadata = {
  title: 'EduHub - All-in-One Course Learning Platform',
  description: 'A comprehensive learning platform for engineering students. Master control systems, signal processing, and more with interactive lessons, quizzes, and study tools.',
  keywords: ['learning', 'education', 'engineering', 'control systems', 'signals', 'courses'],
  authors: [{ name: 'EduHub' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EduHub',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CoursesProvider>
            <PlaybackProvider>
              {children}
              <MusicWidget />
              <PomodoroWidget />
            </PlaybackProvider>
          </CoursesProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
