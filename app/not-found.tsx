import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-white dark:bg-background min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold font-serif mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-text-secondary dark:text-gray-500 dark:text-text-muted mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
