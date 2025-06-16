"use client"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  
  return (
    <div className="p-4 bg-red-50 border-l-4 border-red-500">
      <h2 className="text-xl font-bold text-red-700">Something went wrong!</h2>
      <p className="mt-2 text-red-600">{error.message}</p>
      
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Try again
      </button>
    </div>
  )
}