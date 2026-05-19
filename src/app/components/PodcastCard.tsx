import { motion } from 'framer-motion'
import { Play, Clock } from 'lucide-react'
import { useYouTubeMetadata } from '../hooks/useYouTubeMetadata'
import type { PodcastEpisodeInput } from '../data/podcasts'

type PodcastCardProps = {
  episode: PodcastEpisodeInput
  index: number
}

export default function PodcastCard({ episode, index }: PodcastCardProps) {
  const { metadata, loading, error, videoId } = useYouTubeMetadata(episode.youtubeUrl)

  const title = metadata?.title || 'Loading…'
  const thumbnailUrl = metadata?.thumbnailUrl ?? ''
  const hasMeta =
    Boolean(episode.channel) || Boolean(episode.publishedAt) || Boolean(episode.duration)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group flex flex-col h-full bg-white rounded-2xl border border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md hover:border-stone-300/90 transition-all overflow-hidden"
    >
      <a
        href={episode.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video overflow-hidden bg-stone-200"
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={loading ? 'Podcast episode' : title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full animate-pulse bg-stone-300" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#ed8416] text-white shadow-lg">
            <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
          </span>
        </span>
      </a>

      <div className="flex flex-col flex-1 p-8 md:p-10">
        {hasMeta && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 mb-5">
            {episode.channel && <span>{episode.channel}</span>}
            {episode.channel && episode.publishedAt && (
              <span className="text-stone-300">·</span>
            )}
            {episode.publishedAt && (
              <span>
                {new Date(episode.publishedAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            {(episode.channel || episode.publishedAt) && episode.duration && (
              <span className="text-stone-300">·</span>
            )}
            {episode.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ed8416]" />
                {episode.duration}
              </span>
            )}
          </div>
        )}

        <h2
          className={`text-xl md:text-2xl font-bold text-stone-900 mb-4 leading-snug group-hover:text-[#c96d12] transition-colors ${
            loading ? 'animate-pulse text-stone-400' : ''
          }`}
        >
          <a
            href={episode.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ed8416] focus-visible:ring-offset-2 rounded"
          >
            {title}
          </a>
        </h2>

        {error && (
          <p className="text-sm text-amber-700 mb-3">
            {error}
            {videoId ? ` (ID: ${videoId})` : ''}
          </p>
        )}

        <p className="text-stone-600 leading-relaxed text-[1.05rem] mb-6 flex-1">{episode.description}</p>

        <a
          href={episode.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#ed8416] font-semibold hover:text-[#c96d12] transition-colors mt-auto"
        >
          Watch on YouTube
          <Play className="w-4 h-4" fill="currentColor" />
        </a>
      </div>
    </motion.article>
  )
}
