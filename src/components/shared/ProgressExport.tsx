'use client';

import { useState, useCallback } from 'react';
import { Download, Upload, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useProgressStore } from '@/lib/storage/progress-store';

interface ProgressExportProps {
  open: boolean;
  onClose: () => void;
}

export function ProgressExportModal({ open, onClose }: ProgressExportProps) {
  const { progress, resetProgress } = useProgressStore();
  const [importError, setImportError] = useState<string | null>(null);

  const handleExport = useCallback(() => {
    const data = JSON.stringify(progress, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eduhub-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [progress]);

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Validate structure
        if (!data.courses || typeof data.currentStreak !== 'number') {
          throw new Error('Invalid progress file format');
        }

        // Import the data
        localStorage.setItem('eduhub-progress', JSON.stringify(data));
        window.location.reload(); // Refresh to apply changes
      } catch (err) {
        setImportError(err instanceof Error ? err.message : 'Failed to import progress');
      }
    };
    reader.readAsText(file);
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      onClose();
    }
  }, [resetProgress, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Progress Management</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Section */}
          <div className="space-y-2">
            <h4 className="font-medium">Export Progress</h4>
            <p className="text-sm text-muted-foreground">
              Download your progress as a JSON file. Use this to backup your progress or transfer to another device.
            </p>
            <Button onClick={handleExport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Progress
            </Button>
          </div>

          {/* Import Section */}
          <div className="space-y-2">
            <h4 className="font-medium">Import Progress</h4>
            <p className="text-sm text-muted-foreground">
              Restore progress from a previously exported file. This will replace your current progress.
            </p>
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                id="import-file"
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => document.getElementById('import-file')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Progress
              </Button>
            </div>
            {importError && (
              <p className="text-sm text-red-500">{importError}</p>
            )}
          </div>

          {/* Reset Section */}
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-medium text-red-600">Danger Zone</h4>
            <p className="text-sm text-muted-foreground">
              Reset all progress and start fresh. This cannot be undone.
            </p>
            <Button variant="destructive" onClick={handleReset} className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All Progress
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
