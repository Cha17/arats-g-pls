import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

// Event Card Skeleton
function EventCardSkeleton() {
  return (
    <div className="w-full max-w-sm border border-gray-300 rounded-lg p-4 space-y-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Event Carousel Skeleton
function EventCarouselSkeleton() {
  return (
    <div className="w-full">
      <div className="flex space-x-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
            <EventCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard Stats Skeleton
function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
}

// Registration Card Skeleton
function RegistrationCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-9 w-full" />
    </div>
  );
}

// Search Bar Skeleton
function SearchBarSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

// Page Header Skeleton
function PageHeaderSkeleton() {
  return (
    <div className="text-center space-y-4">
      <Skeleton className="h-12 w-48 mx-auto" />
      <Skeleton className="h-6 w-96 mx-auto" />
    </div>
  );
}

// Loading Spinner
function LoadingSpinner({
  size = "default",
}: {
  size?: "sm" | "default" | "lg";
}) {
  const sizeClasses = {
    sm: "h-6 w-6",
    default: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          "animate-spin rounded-full border-b-2 border-blue-600",
          sizeClasses[size]
        )}
      />
    </div>
  );
}

export {
  Skeleton,
  EventCardSkeleton,
  EventCarouselSkeleton,
  DashboardStatsSkeleton,
  RegistrationCardSkeleton,
  SearchBarSkeleton,
  PageHeaderSkeleton,
  LoadingSpinner,
};
