'use client';

import { useState, useCallback } from 'react';
import { Download, Share2, Award, Calendar, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Course } from '@/types';

interface CertificateModalProps {
  course: Course;
  open: boolean;
  onClose: () => void;
}

export function CertificateModal({ course, open, onClose }: CertificateModalProps) {
  const [userName, setUserName] = useState('');
  const [generated, setGenerated] = useState(false);

  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const generateCertificate = useCallback(() => {
    if (!userName.trim()) return;
    setGenerated(true);
  }, [userName]);

  const downloadCertificate = useCallback(() => {
    // Create certificate canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 850;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#1F4E79';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner border
    ctx.strokeStyle = '#2E75B6';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Decorative corners
    ctx.fillStyle = '#1F4E79';
    const cornerSize = 30;
    // Top left
    ctx.fillRect(20, 20, cornerSize, 8);
    ctx.fillRect(20, 20, 8, cornerSize);
    // Top right
    ctx.fillRect(canvas.width - 20 - cornerSize, 20, cornerSize, 8);
    ctx.fillRect(canvas.width - 28, 20, 8, cornerSize);
    // Bottom left
    ctx.fillRect(20, canvas.height - 28, cornerSize, 8);
    ctx.fillRect(20, canvas.height - 20 - cornerSize, 8, cornerSize);
    // Bottom right
    ctx.fillRect(canvas.width - 20 - cornerSize, canvas.height - 28, cornerSize, 8);
    ctx.fillRect(canvas.width - 28, canvas.height - 20 - cornerSize, 8, cornerSize);

    // Header
    ctx.fillStyle = '#1F4E79';
    ctx.font = 'bold 48px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', canvas.width / 2, 150);
    
    ctx.font = '32px Georgia, serif';
    ctx.fillText('OF COMPLETION', canvas.width / 2, 195);

    // Decorative line
    ctx.beginPath();
    ctx.moveTo(300, 220);
    ctx.lineTo(canvas.width - 300, 220);
    ctx.strokeStyle = '#2E75B6';
    ctx.lineWidth = 2;
    ctx.stroke();

    // This is to certify
    ctx.fillStyle = '#6B7280';
    ctx.font = '20px Arial, sans-serif';
    ctx.fillText('This is to certify that', canvas.width / 2, 280);

    // User name
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 42px Georgia, serif';
    ctx.fillText(userName, canvas.width / 2, 350);

    // Decorative line under name
    ctx.beginPath();
    ctx.moveTo(350, 370);
    ctx.lineTo(canvas.width - 350, 370);
    ctx.strokeStyle = '#1F4E79';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Has successfully completed
    ctx.fillStyle = '#6B7280';
    ctx.font = '20px Arial, sans-serif';
    ctx.fillText('has successfully completed the course', canvas.width / 2, 420);

    // Course name
    ctx.fillStyle = '#1F4E79';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText(course.title, canvas.width / 2, 480);

    // Completion date
    ctx.fillStyle = '#6B7280';
    ctx.font = '18px Arial, sans-serif';
    ctx.fillText(`Completed on ${completionDate}`, canvas.width / 2, 540);

    // Estimated hours
    ctx.fillText(`Course Duration: ${course.estimatedHours} hours`, canvas.width / 2, 570);

    // EduHub branding
    ctx.fillStyle = '#1F4E79';
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.fillText('EduHub', canvas.width / 2, 680);
    
    ctx.fillStyle = '#6B7280';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText('All-in-One Course Learning Platform', canvas.width / 2, 710);

    // Certificate ID
    const certId = `CERT-${Date.now().toString(36).toUpperCase()}`;
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '12px monospace';
    ctx.fillText(`Certificate ID: ${certId}`, canvas.width / 2, 780);

    // Download
    const link = document.createElement('a');
    link.download = `certificate-${course.slug}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [course, userName, completionDate]);

  const handleClose = useCallback(() => {
    setGenerated(false);
    setUserName('');
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Course Certificate
          </DialogTitle>
        </DialogHeader>

        {!generated ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Congratulations on completing <strong>{course.title}</strong>! 
              Enter your name as you want it to appear on your certificate.
            </p>
            <div className="space-y-2">
              <Label htmlFor="userName">Your Name</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={generateCertificate}
              disabled={!userName.trim()}
            >
              Generate Certificate
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Certificate Preview */}
            <div className="border-2 border-primary rounded-lg p-6 bg-gradient-to-br from-slate-50 to-white">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">CERTIFICATE OF COMPLETION</p>
                <p className="text-sm text-muted-foreground mb-3">This certifies that</p>
                <p className="text-xl font-bold text-primary mb-3">{userName}</p>
                <p className="text-sm text-muted-foreground mb-2">has completed</p>
                <p className="font-semibold mb-3">{course.title}</p>
                <p className="text-xs text-muted-foreground">{completionDate}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={downloadCertificate}>
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </Button>
            </div>
            <Button variant="outline" className="w-full" onClick={handleClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
