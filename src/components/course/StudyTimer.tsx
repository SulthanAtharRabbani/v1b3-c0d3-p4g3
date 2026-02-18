'use client';

import { useEffect, useState, useCallback } from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StudyTimerProps {
  className?: string;
}

interface StudyTimeData {
  totalSeconds: number;
  lastSaved: string;
  dailySeconds: Record<string, number>; // date string -> seconds
}

const STORAGE_KEY = 'eduhub-study-time';

export function StudyTimer({ className }: StudyTimerProps) {
  const [sessionTime, setSessionTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [todayTime, setTodayTime] = useState(0);
  const [weeklyTime, setWeeklyTime] = useState(0);

  // Load saved time from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: StudyTimeData = JSON.parse(saved);
        const today = new Date().toDateString();
        
        // Calculate weekly total
        let weekTotal = 0;
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toDateString();
          weekTotal += data.dailySeconds?.[dateStr] || 0;
        }
        
        queueMicrotask(() => {
          setTotalTime(data.totalSeconds || 0);
          setTodayTime(data.dailySeconds?.[today] || 0);
          setWeeklyTime(weekTotal);
        });
      } catch {
        // ignore
      }
    }
  }, []);

  // Timer effect - track time while on the hub
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
      setTotalTime(prev => prev + 1);
      setTodayTime(prev => prev + 1);
      setWeeklyTime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Save to localStorage periodically
  useEffect(() => {
    const saveInterval = setInterval(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data: StudyTimeData = saved ? JSON.parse(saved) : { totalSeconds: 0, lastSaved: '', dailySeconds: {} };
      const today = new Date().toDateString();
      
      data.totalSeconds = totalTime;
      data.lastSaved = new Date().toISOString();
      data.dailySeconds = data.dailySeconds || {};
      data.dailySeconds[today] = todayTime;
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 10000);

    return () => clearInterval(saveInterval);
  }, [totalTime, todayTime]);

  // Save on unmount
  useEffect(() => {
    return () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data: StudyTimeData = saved ? JSON.parse(saved) : { totalSeconds: 0, lastSaved: '', dailySeconds: {} };
      const today = new Date().toDateString();
      
      data.totalSeconds = totalTime;
      data.lastSaved = new Date().toISOString();
      data.dailySeconds = data.dailySeconds || {};
      data.dailySeconds[today] = todayTime;
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };
  }, [totalTime, todayTime]);

  const formatTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, []);

  const formatDetailedTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Study Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Today's time */}
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-primary">
            {formatDetailedTime(todayTime)}
          </div>
          <p className="text-xs text-muted-foreground">Today</p>
        </div>

        {/* Stats */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">This session:</span>
            <span className="font-medium">{formatTime(sessionTime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">This week:</span>
            <span className="font-medium">{formatTime(weeklyTime)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              All time:
            </span>
            <span className="font-medium">{formatTime(totalTime)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
