export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="container-custom py-12">
        <div className="animate-pulse">
          {/* Title skeleton */}
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
          
          {/* Meta skeleton */}
          <div className="flex gap-4 mb-8">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          
          {/* Image skeleton */}
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          
          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
