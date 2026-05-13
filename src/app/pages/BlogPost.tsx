import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import BlogArticleBlocks from '../components/BlogArticleBlocks'
import { getPostBySlug } from '../data/blog'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f4f4f2]">
        <Navigation />
        <div className="max-w-2xl mx-auto px-6 pt-40 pb-24 text-center">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Post not found</h1>
          <p className="text-stone-600 mb-8">This article may have been moved or removed.</p>
          <Link to="/blogs" className="text-[#ed8416] font-semibold hover:text-[#c96d12]">
            ← Back to blog
          </Link>
        </div>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-[#f4f4f2]">
      <Navigation />

      <article className="pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="w-[70%] max-w-full min-w-0 mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-[#ed8416] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All posts
            </Link>

            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
              <header className="px-8 md:px-12 pt-10 md:pt-12 pb-8 border-b border-stone-100 bg-white">
                <p className="text-[0.7rem] md:text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 mb-3">
                  {post.publicationLine}
                </p>
                <p className="text-sm text-stone-600 mb-6 font-medium">{post.descriptorLine}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 mb-8">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#ed8416]" />
                    {new Date(post.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-stone-300">·</span>
                  <span>{post.readTime}</span>
                  <span className="text-stone-300">·</span>
                  <span>{post.author}</span>
                </div>
                <h1 className="text-[1.65rem] md:text-3xl lg:text-[2.1rem] font-bold text-stone-900 leading-[1.25] tracking-tight">
                  {post.title}
                </h1>
              </header>

              <div className="px-8 md:px-12 py-10 md:py-12 bg-[#fafaf8]">
                <BlogArticleBlocks blocks={post.blocks} />
              </div>

              <footer className="px-8 md:px-12 py-5 border-t border-stone-200 bg-stone-50/80">
                <p className="text-center text-xs text-stone-500 tracking-wide">
                  sunfinity.tech <span className="text-stone-300 mx-2">|</span> Advanced Data Services
                </p>
              </footer>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
