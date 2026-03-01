import { useState, useEffect, useCallback } from 'react'

const API_URL = 'https://dummyjson.com/products'

export function useProducts(searchQuery = '') {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const LIMIT = 12

  const fetchProducts = useCallback(
    async (pageNum, query) => {
      setLoading(true)
      setError(null)
      try {
        let url
        if (query) {
          url = `${API_URL}/search?q=${encodeURIComponent(query)}&limit=${LIMIT}&skip=${pageNum * LIMIT}`
        } else {
          url = `${API_URL}?limit=${LIMIT}&skip=${pageNum * LIMIT}`
        }
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`)
        const data = await res.json()
        const fetched = data.products ?? []

        if (pageNum === 0) {
          setProducts(fetched)
        } else {
          setProducts((prev) => [...prev, ...fetched])
        }

        const totalLoaded = pageNum * LIMIT + fetched.length
        setHasMore(totalLoaded < (data.total ?? 0))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Reset when search changes
  useEffect(() => {
    setPage(0)
    fetchProducts(0, searchQuery)
  }, [searchQuery, fetchProducts])

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    fetchProducts(next, searchQuery)
  }

  return { products, loading, error, hasMore, loadMore }
}