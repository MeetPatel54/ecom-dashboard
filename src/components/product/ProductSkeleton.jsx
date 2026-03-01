export default function ProductSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-48 bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
        </div>
      </div>
    </div>
  )
}