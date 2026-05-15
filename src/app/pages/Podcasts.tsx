import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Podcasts() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 overflow-hidden min-h-[70vh] flex items-center">
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
            {/* <span className="inline-block text-[#ed8416] text-sm font-semibold uppercase tracking-widest mb-4">
              Audio
            </span> */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Podcast</h1>
            <p className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">Coming Soon</p>
            <p className="text-stone-400 text-lg leading-relaxed max-w-xl mx-auto">
              We are preparing conversations on data, sales engineering, and building teams in the AI era. <br></br>Stay Tuned.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
