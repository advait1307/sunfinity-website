import { useEffect, useState } from 'react'
import {
  extractYouTubeVideoId,
  fetchYouTubeMetadata,
  getYouTubeThumbnailUrl,
  type YouTubeOEmbed,
} from '../lib/youtube'

export function useYouTubeMetadata(youtubeUrl: string) {
  const videoId = extractYouTubeVideoId(youtubeUrl)
  const [metadata, setMetadata] = useState<YouTubeOEmbed | null>(() =>
    videoId
      ? { title: '', thumbnailUrl: getYouTubeThumbnailUrl(videoId) }
      : null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      if (!videoId) {
        setMetadata(null)
        setError('Invalid YouTube URL')
        setLoading(false)
        return
      }

      try {
        const result = await fetchYouTubeMetadata(youtubeUrl)
        if (!cancelled) setMetadata(result)
      } catch {
        if (!cancelled) {
          setMetadata({
            title: '',
            thumbnailUrl: getYouTubeThumbnailUrl(videoId),
          })
          setError('Could not load title from YouTube')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [youtubeUrl, videoId])

  return { metadata, loading, error, videoId }
}
