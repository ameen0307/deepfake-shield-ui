import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  variant?: "card" | "list" | "media";
}

export default function LoadingSkeleton({ variant = "card" }: LoadingSkeletonProps) {
  if (variant === "card") {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="pt-4">
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "media") {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        <Skeleton className="h-64 w-full" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    );
  }

  return null;
}
