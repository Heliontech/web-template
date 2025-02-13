import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="mt-10 space-y-4 p-4">
      <Skeleton className="h-[20px] w-[100px] rounded-full" />
      <Skeleton className="h-[20px] w-[200px] rounded-full" />
      <Skeleton className="h-[20px] w-[300px] rounded-full" />
      <Skeleton className="h-[20px] w-[400px] rounded-full" />
    </div>
  );
}
