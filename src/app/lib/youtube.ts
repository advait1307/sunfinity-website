export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url.trim())
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('/')[0]
      return id || null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v')
      }
      const embedMatch = parsed.pathname.match(/^\/embed\/([^/?]+)/)
      if (embedMatch) return embedMatch[1]
      const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/?]+)/)
      if (shortsMatch) return shortsMatch[1]
    }
  } catch {
    return null
  }

  return null
}

export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export type YouTubeOEmbed = {
  title: string
  thumbnailUrl: string
}

const metadataCache = new Map<string, YouTubeOEmbed>()

export async function fetchYouTubeMetadata(youtubeUrl: string): Promise<YouTubeOEmbed> {
  const cached = metadataCache.get(youtubeUrl)
  if (cached) return cached

  const videoId = extractYouTubeVideoId(youtubeUrl)
  const fallbackThumbnail = videoId ? getYouTubeThumbnailUrl(videoId) : ''

  const response = await fetch(
    `https://noembed.com/embed?url=${encodeURIComponent(youtubeUrl)}`
  )

  if (!response.ok) {
    throw new Error('Could not load YouTube metadata')
  }

  const data = (await response.json()) as {
    title?: string
    thumbnail_url?: string
  }

  const metadata: YouTubeOEmbed = {
    title: data.title ?? 'YouTube video',
    thumbnailUrl: data.thumbnail_url ?? fallbackThumbnail,
  }

  metadataCache.set(youtubeUrl, metadata)
  return metadata
}
