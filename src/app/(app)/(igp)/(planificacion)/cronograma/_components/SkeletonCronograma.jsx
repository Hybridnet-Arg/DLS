import { Loader } from 'lucide-react';

export default function SkeletonCronograma() {
  return (
    <div className="flex justify-center items-center h-[360px]">
      <Loader size={50} className="animate-spin text-dark" />
    </div>
  );
}
