import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
