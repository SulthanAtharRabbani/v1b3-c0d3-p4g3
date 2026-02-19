'use client';

import { Settings, Download, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StudyStatistics } from '@/components/hub/StudyStatistics';
import { ProgressExportModal } from './ProgressExport';
import { useState } from 'react';

export function SettingsModal() {
  const [showExport, setShowExport] = useState(false);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl flex flex-col">
          <DialogHeader className="shrink-0">
            <DialogTitle>Settings & Statistics</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 flex-1 overflow-y-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
            {/* Quick Actions */}
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => setShowExport(true)}>
                <Download className="h-4 w-4 mr-2" />
                Export/Import Progress
              </Button>
            </div>

            {/* Study Statistics */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                Study Statistics
              </h3>
              <StudyStatistics />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ProgressExportModal open={showExport} onClose={() => setShowExport(false)} />
    </>
  );
}
