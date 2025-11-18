export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Header skeleton */}
      <div className="bg-gray-200 dark:bg-gray-700 py-12 animate-pulse">
        <div className="container-custom">
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-3"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-64"></div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-background-card rounded-lg overflow-hidden shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
