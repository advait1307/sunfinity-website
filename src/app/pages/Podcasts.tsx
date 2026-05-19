import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import PodcastCard from '../components/PodcastCard'
import { podcastEpisodes } from '../data/podcasts'
import { extractYouTubeVideoId } from '../lib/youtube'

export default function Podcasts() {
  return (
    <div className="min-h-screen bg-[#f4f4f2]">
      <Navigation />

      <section className="relative pt-32 pb-16 md:pb-20 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#ed8416]/20 border border-[#ed8416]/40 mb-8 mx-auto">
              <Mic className="w-10 h-10 text-[#ed8416]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Podcast</h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-xl mx-auto">
              Conversations on data, sales engineering, and building teams in the AI era — from{' '}
              <span className="text-white/90 font-medium">Architects of the Technical Win</span>.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {podcastEpisodes.map((episode, idx) => (
              <PodcastCard
                key={extractYouTubeVideoId(episode.youtubeUrl) ?? episode.youtubeUrl}
                episode={episode}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
