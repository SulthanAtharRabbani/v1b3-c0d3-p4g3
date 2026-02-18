'use client';

import { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // Extract headings from content
  useEffect(() => {
    const headings: TOCItem[] = [];
    const regex = /<h([2-4])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const id = match[2];
      // Strip HTML tags from text
      const text = match[3].replace(/<[^>]+>/g, '');
      headings.push({ id, text, level });
    }

    // Using microtask to avoid synchronous setState warning
    queueMicrotask(() => setItems(headings));
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          return;
        }
      }

      setActiveId(items[0]?.id || '');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for header
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  if (items.length === 0) return null;

  return (
    <div className={cn('relative', className)}>
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-1.5"
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">Contents</span>
        <ChevronRight
          className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-90')}
        />
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-popover border rounded-lg shadow-lg z-50">
            <div className="p-2 border-b">
              <h4 className="text-sm font-medium">Table of Contents</h4>
            </div>
            <ScrollArea className="max-h-80">
              <div className="p-2 space-y-1">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={cn(
                      'w-full text-left text-sm px-2 py-1.5 rounded transition-colors',
                      'hover:bg-muted',
                      item.level === 2 && 'font-medium',
                      item.level === 3 && 'pl-4',
                      item.level === 4 && 'pl-6 text-xs',
                      activeId === item.id && 'bg-primary/10 text-primary'
                    )}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}
