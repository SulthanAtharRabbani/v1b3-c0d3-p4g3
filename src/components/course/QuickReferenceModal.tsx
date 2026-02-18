'use client';

import { useState, useCallback, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/shared/Badge';
import type { ReferenceItem, Course } from '@/types';
import { cn } from '@/lib/utils';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface QuickReferenceModalProps {
  course: Course;
  references: ReferenceItem[];
  open: boolean;
  onClose: () => void;
}

export function QuickReferenceModal({ course, references, open, onClose }: QuickReferenceModalProps) {
  const [search, setSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const modules = useMemo(() => 
    [...new Set(references.map((r) => r.module).filter((m): m is string => Boolean(m)))],
    [references]
  );

  const filteredReferences = useMemo(() => 
    references.filter((ref) => {
      const matchesSearch = search === '' ||
        ref.title.toLowerCase().includes(search.toLowerCase()) ||
        ref.description.toLowerCase().includes(search.toLowerCase());
      const matchesModule = !selectedModule || ref.module === selectedModule;
      return matchesSearch && matchesModule;
    }),
    [references, search, selectedModule]
  );

  const handleCopy = useCallback(async (formula: string, id: string) => {
    try {
      await navigator.clipboard.writeText(formula);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      console.error('Failed to copy');
    }
  }, []);

  const handleClose = useCallback(() => {
    setSearch('');
    setSelectedModule(null);
    onClose();
  }, [onClose]);

  const renderFormula = useCallback((formula: string) => {
    const html = katex.renderToString(formula, {
      displayMode: true,
      throwOnError: false,
    });
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Quick Reference</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search formulas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Module Filter */}
          {modules.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedModule === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedModule(null)}
              >
                All
              </Button>
              {modules.map((moduleId) => {
                const courseModule = course.modules.find((m) => m.id === moduleId);
                return (
                  <Button
                    key={moduleId}
                    variant={selectedModule === moduleId ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedModule(moduleId)}
                  >
                    {courseModule?.title || moduleId}
                  </Button>
                );
              })}
            </div>
          )}

          {/* References */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {filteredReferences.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No formulas found
              </div>
            ) : (
              filteredReferences.map((ref) => (
                <div
                  key={ref.id}
                  className="p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{ref.title}</h4>
                      <p className="text-sm text-muted-foreground">{ref.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(ref.formula, ref.id)}
                    >
                      {copiedId === ref.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-muted p-3 rounded-lg overflow-x-auto">
                    {renderFormula(ref.formula)}
                  </div>
                  {ref.module && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      {course.modules.find((m) => m.id === ref.module)?.title}
                    </Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
