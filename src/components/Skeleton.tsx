interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-shimmer rounded-xl bg-pastel/60 ${className}`}
      aria-hidden="true"
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-9 w-full rounded-full" />
      </div>
    </div>
  )
}

export function ErrorDisplay({ message = "Error al cargar los datos. Intentá de nuevo más tarde." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-4xl mb-4">😅</span>
      <p className="font-display text-lg text-dark mb-1">Algo salió mal</p>
      <p className="font-body text-sm text-gray max-w-md">{message}</p>
    </div>
  )
}

export function CategorySkeleton() {
  return (
    <div className="rounded-2xl p-6 flex flex-col items-center gap-3 bg-pastel/30">
      <Skeleton className="w-12 h-12 rounded-full" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-3 w-28" />
    </div>
  )
}
