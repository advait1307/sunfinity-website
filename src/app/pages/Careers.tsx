import { motion } from 'framer-motion'
import { Briefcase, MapPin, Mail, Hash } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { jobListings, buildApplicationMailto } from '../data/careers'

export default function Careers() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#ed8416] to-[#9d5710] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Join us
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6">Careers</h1>
            <p className="text-white/85 text-xl max-w-2xl mx-auto leading-relaxed">
              Help enterprises simplify the complex. <br></br>Explore open roles at Sunfinity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* <p className="text-stone-600 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Each listing includes a unique job ID. Easy apply opens an email to{' '}
            <a href="mailto:sales@sunfinity.tech" className="text-[#ed8416] hover:underline">
              sales@sunfinity.tech
            </a>{' '}
            with{' '}
            <a href="mailto:rashi.goel@sunfinity.tech" className="text-[#ed8416] hover:underline">
              rashi.goel@sunfinity.tech
            </a>{' '}
            on CC. Add your details, attach your resume, and send.
          </p> */}

          <div className="space-y-6">
            {jobListings.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#ed8416] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                        <Hash className="w-3.5 h-3.5" />
                        {job.id}
                      </span>
                      <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                        {job.type}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-3 flex items-start gap-2">
                      <Briefcase className="w-6 h-6 text-[#ed8416] shrink-0 mt-1" />
                      {job.title}
                    </h2>
                    <p className="flex items-center gap-2 text-stone-600 text-sm mb-4">
                      <MapPin className="w-4 h-4 text-[#ed8416] shrink-0" />
                      {job.location}
                    </p>
                    <p className="text-stone-600 leading-relaxed">{job.summary}</p>
                  </div>
                  <div className="shrink-0 md:pt-1">
                    <a
                      href={buildApplicationMailto(job)}
                      className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-[#ed8416] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#c96d12] transition-colors shadow-md whitespace-nowrap"
                    >
                      <Mail className="w-4 h-4" />
                      Easy apply
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
