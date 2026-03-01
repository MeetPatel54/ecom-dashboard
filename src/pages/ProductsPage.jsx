import { useState, useEffect, useRef, useCallback } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import ProductSkeleton from '../components/product/ProductSkeleton'
import { Search, AlertCircle } from 'lucide-react'

export default function ProductsPage() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const { products, loading, error, hasMore, loadMore } = useProducts(debouncedQuery)
  const observer = useRef(null)
  const sentinelRef = useRef(null)

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400)
    return () => clearTimeout(t)
  }, [query])

  // Infinite scroll via IntersectionObserver
  const setupObserver = useCallback(() => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )
    if (sentinelRef.current) observer.current.observe(sentinelRef.current)
  }, [hasMore, loading, loadMore])

  useEffect(() => {
    setupObserver()
    return () => observer.current?.disconnect()
  }, [setupObserver])

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Products</h1>
          <p className="text-sm text-zinc-400 mt-0.5">
            {products.length > 0 ? `Showing ${products.length} products` : 'Browse our catalog'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="input-field pl-9"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-500/10 px-4 py-3 rounded-xl mb-6">
          <AlertCircle size={16} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Grid */}
      {products.length === 0 && !loading && !error && (
        <div className="text-center py-20 text-zinc-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No products found</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}

        {/* Skeleton on first load */}
        {loading && products.length === 0 &&
          Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
        }
      </div>

      {/* Load more skeleton */}
      {loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      )}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-4 mt-4" />

      {!hasMore && products.length > 0 && (
        <p className="text-center text-sm text-zinc-400 py-6">You've reached the end</p>
      )}
    </div>
  )
}