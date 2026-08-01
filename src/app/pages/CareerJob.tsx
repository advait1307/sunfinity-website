import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Hash,
  Mail,
  MapPin,
  UserRound,
} from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { buildApplicationMailto, type JobManager } from '../data/careers'
import { useJobBySlug } from '../hooks/useJobBySlug'

function ManagerCard({
  label,
  manager,
}: {
  label: string
  manager: JobManager
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#ed8416] mb-3">{label}</p>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
          <UserRound className="w-5 h-5 text-[#ed8416]" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-stone-900">{manager.name}</p>
          {manager.title && <p className="text-sm text-stone-500 mt-0.5">{manager.title}</p>}
          {manager.email && (
            <a
              href={`mailto:${manager.email}`}
              className="inline-flex items-center gap-1.5 text-sm text-[#ed8416] hover:text-[#c96d12] mt-2 break-all"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              {manager.email}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CareerJob() {
  const { slug } = useParams<{ slug: string }>()
  const { job, loading, error } = useJobBySlug(slug)

  if (loading || job === undefined) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navigation />
        <div className="max-w-3xl mx-auto px-6 pt-40 pb-24">
          <div className="h-10 w-40 bg-stone-200 rounded animate-pulse mb-8" />
          <div className="h-72 bg-white rounded-2xl border border-stone-200 animate-pulse" />
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navigation />
        <div className="max-w-2xl mx-auto px-6 pt-40 pb-24 text-center">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Role not found</h1>
          <p className="text-stone-600 mb-8">
            {error || 'This opening may have been filled or removed.'}
          </p>
          <Link to="/careers" className="text-[#ed8416] font-semibold hover:text-[#c96d12]">
            ← Back to careers
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const descriptionParagraphs = job.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      <article className="pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-[#ed8416] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All openings
            </Link>

            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
              <header className="px-8 md:px-10 pt-10 md:pt-12 pb-8 border-b border-stone-100">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#ed8416] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                    <Hash className="w-3.5 h-3.5" />
                    {job.id}
                  </span>
                  <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                    {job.type}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-4 flex items-start gap-3">
                  <Briefcase className="w-8 h-8 text-[#ed8416] shrink-0 mt-1" />
                  {job.title}
                </h1>
                <p className="flex items-center gap-2 text-stone-600 mb-6">
                  <MapPin className="w-4 h-4 text-[#ed8416] shrink-0" />
                  {job.location}
                </p>
                <p className="text-stone-600 leading-relaxed text-lg">{job.summary}</p>
                <a
                  href={buildApplicationMailto(job)}
                  className="inline-flex items-center gap-2 mt-8 bg-[#ed8416] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#c96d12] transition-colors shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  Easy apply
                </a>
              </header>

              <div className="px-8 md:px-10 py-10 space-y-10">
                <section>
                  <h2 className="text-xl font-bold text-stone-900 mb-4">Job description</h2>
                  <div className="space-y-4 text-stone-600 leading-relaxed">
                    {descriptionParagraphs.map((paragraph, index) => (
                      <p key={index} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-stone-900 mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-3 text-stone-600">
                        <CheckCircle className="w-5 h-5 text-[#ed8416] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-stone-900 mb-4">Hiring contacts</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <ManagerCard label="HR Manager" manager={job.hrManager} />
                    <ManagerCard label="Hiring Manager" manager={job.technicalManager} />
                  </div>
                </section>
              </div>

              <footer className="px-8 md:px-10 py-6 border-t border-stone-200 bg-stone-50/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <p className="text-sm text-stone-500">
                  Interested? Apply with your resume via email.
                </p>
                <a
                  href={buildApplicationMailto(job)}
                  className="inline-flex items-center justify-center gap-2 bg-[#ed8416] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c96d12] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Easy apply
                </a>
              </footer>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
