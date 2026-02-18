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
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Settings & Statistics</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowExport(true)}>
                <Download className="h-4 w-4 mr-2" />
                Export/Import Progress
              </Button>
            </div>

            {/* Study Statistics */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
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
