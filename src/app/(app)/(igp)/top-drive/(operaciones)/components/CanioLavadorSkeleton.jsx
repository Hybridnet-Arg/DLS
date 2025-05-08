import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/shadcn/skeleton';

export default function CanioLavadorSkeleton() {
  return (
    <div className="relative h-full w-full">
      <Skeleton className="h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader size={40} className="animate-spin text-dark" />
      </div>
    </div>
  );
}
