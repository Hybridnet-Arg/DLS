import { Skeleton } from '@/components/ui/shadcn/skeleton';

export default function AdvancementCurveSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex flex-col flex-1 md:flex-[1.5]">
        <Skeleton className="w-full h-[27rem] rounded" />
      </div>
      <div className="flex flex-col flex-1 md:flex-1">
        <Skeleton className="w-full h-[27rem] rounded" />
      </div>
    </div>
  );
}
