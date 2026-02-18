import { GraduationCap, Loader2 } from 'lucide-react';

export default function HubLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <Loader2 className="h-5 w-5 absolute -bottom-1 -right-1 animate-spin text-primary" />
        </div>
        <div>
          <p className="font-medium">Loading EduHub</p>
          <p className="text-sm text-muted-foreground">Preparing your dashboard</p>
        </div>
      </div>
    </div>
  );
}
