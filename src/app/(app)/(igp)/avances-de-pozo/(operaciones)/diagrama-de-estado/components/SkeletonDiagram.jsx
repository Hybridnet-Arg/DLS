import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonDiagram() {
  return (
    <div className="flex flex-col md:flex-row gap-5 p-4">
      <div className="flex flex-col flex-1 ">
        <Skeleton className="w-full h-[27rem] rounded" />
      </div>
    </div>
  );
}
