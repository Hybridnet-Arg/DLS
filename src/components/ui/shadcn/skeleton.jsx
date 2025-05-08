import { cn } from '@/lib/shadcn/utils';

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  );
}

function SkeletonContainer() {
  return (
    <div className="flex flex-col md:flex-row gap-5 p-4">
      <div className="flex flex-col flex-1 ">
        <Skeleton className="w-full h-[27rem] rounded" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonContainer };
