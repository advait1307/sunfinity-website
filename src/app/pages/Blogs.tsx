import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { blogPosts } from '../data/blog'

export default function Blogs() {
  return (
    <div className="min-h-screen bg-[#f4f4f2]">
      <Navigation />

      <section className="relative pt-32 pb-16 md:pb-20 bg-gradient-to-br from-[#ed8416] to-[#9d5710] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              Data Engineering Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight">Blog</h1>
            <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Deep dives on new technologies and practices in data engineering, security, and data platforms
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        {/* <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-10"> */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="group flex flex-col h-full bg-white rounded-2xl border border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md hover:border-stone-300/90 transition-all overflow-hidden"
              >
                <div className="flex flex-col flex-1 p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 mb-5">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#ed8416]" />
                      {new Date(post.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span>{post.author}</span>
                    <span className="text-stone-300">·</span>
                    <span>🕒 {post.readTime}</span>
                    
                  </div>
                  <p className="text-sm text-stone-600 mb-4 font-medium">{post.descriptorLine}</p>
                  <h2 className="text-xl md:text-2xl font-bold text-stone-900 mb-4 leading-snug group-hover:text-[#c96d12] transition-colors">
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ed8416] focus-visible:ring-offset-2 rounded"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-stone-600 leading-relaxed text-[1.05rem] mb-6 flex-1">{post.excerpt}</p>
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#ed8416] font-semibold hover:text-[#c96d12] transition-colors mt-auto"
                  >
                    Read article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
