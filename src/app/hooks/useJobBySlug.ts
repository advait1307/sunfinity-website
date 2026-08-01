import { useEffect, useState } from 'react'
import { fetchJobBySlug, type JobListing } from '../data/careers'

export function useJobBySlug(slug: string | undefined) {
  const [job, setJob] = useState<JobListing | null | undefined>(undefined)
  const [loading, setLoading] = useState(Boolean(slug))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setJob(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)
    setJob(undefined)

    fetchJobBySlug(slug)
      .then((data) => {
        if (!cancelled) setJob(data ?? null)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load job')
          setJob(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { job, loading, error }
}
