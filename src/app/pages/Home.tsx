import { motion } from 'framer-motion'
import { Database, TrendingUp, Users, ChevronRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const partnerLogos = [
  { name: 'EDB Postgres', src: '/images/edb-postgres.png' },
  { name: 'Yugabyte DB', src: '/images/yugabyte-logo.png' },
  { name: 'Salesforce', src: '/images/salesforce-logo.png' },
  { name: 'Elastic', src: '/images/elastic-logo.png' },
  { name: 'Cloudera', src: '/images/cloudera-logo.png' },
  { name: 'EDB Postgres', src: '/images/edb-postgres.png' },
  { name: 'Yugabyte DB', src: '/images/yugabyte-logo.png' },
  { name: 'Salesforce', src: '/images/salesforce-logo.png' },
  { name: 'Elastic', src: '/images/elastic-logo.png' },
  { name: 'Cloudera', src: '/images/cloudera-logo.png' },
]

const services = [
  {
    icon: Database,
    title: 'Advanced Data Services',
    tagline: 'Complex Data, Simplified',
    description:
      'End-to-end database services — consulting, implementation, migration, and managed services. Core expertise in PostgreSQL, MongoDB, and Elastic across commercial and community versions.',
    to: '/advanced-data-services',
    color: 'from-orange-500 to-amber-600',
    image: '/images/Advanced Data Services .jpg',
  },
  {
    icon: TrendingUp,
    title: 'UpSkilling Services',
    tagline: 'Complex Sales, Simplified',
    description:
      'We equip technical sales teams with the Sellers Interpersonal Quotient (SIQ) — the force multiplier that turns technical excellence into closed deals.',
    to: '/upskilling-services',
    color: 'from-amber-500 to-orange-600',
    image: '/images/upskilling.jpg',
  },
  {
    icon: Users,
    title: 'Staffing Services',
    tagline: 'Complex Talent, Simplified',
    description:
      'Elite talent acquisition and contract staffing for the AI-driven world. Specializing in Data Services & Architecture, Cloud Solutions, and Solution Engineering.',
    to: '/staffing-services',
    color: 'from-orange-600 to-red-600',
    image: '/images/staffing.jpg',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ed8416] via-[#c96d12] to-[#9d5710]" />
        <div className="absolute inset-0 opacity-15">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-1">
              <div className="h-14 overflow-hidden flex items-center">
                <img
                  src="/images/sunfinity-logo.png"
                  alt="Sunfinity Technology Solutions"
                  className="h-40 w-auto object-contain"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 tracking-tight">
              Simplifying<br />The Complex
            </h1>
            {/* <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Sunfinity Technology Solutions — powering data, sales, and talent for India's most ambitious organisations.
            </p> */}

            {/* Three pillars */}
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
              {[
                { label: 'Complex Data, Simplified', sub: 'Database & Analytics' },
                { label: 'Complex Sales, Simplified', sub: 'UpSkilling & SIQ' },
                { label: 'Complex Talent, Simplified', sub: 'Staffing & Acquisition' },
              ].map((p) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/20"
                >
                  <p className="text-white font-semibold text-sm">{p.label}</p>
                  <p className="text-white/60 text-xs mt-1">{p.sub}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/advanced-data-services"
                className="inline-flex items-center gap-2 bg-white text-[#ed8416] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Explore Services <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:sales@sunfinity.tech"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Get in Touch <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 20C1200 80 800 0 480 40C240 70 80 10 0 30L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="pt-16 pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-[#ed8416] font-semibold text-sm uppercase tracking-widest">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Three pillars. One mission.</h2>
          </motion.div>

          <div className="space-y-20">
            {services.map((service, idx) => {
              const Icon = service.icon
              const isEven = idx % 2 === 0
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:grid-flow-dense' : ''}`}
                >
                  {/* Text side */}
                  <div className={!isEven ? 'md:col-start-2' : ''}>
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[#ed8416] font-semibold text-sm uppercase tracking-widest">{service.tagline}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">{service.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{service.description}</p>
                    <Link
                      to={service.to}
                      className="inline-flex items-center gap-2 text-[#ed8416] font-semibold hover:gap-3 transition-all group"
                    >
                      Learn more <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Visual side */}
                  <div className={`${!isEven ? 'md:col-start-1 md:row-start-1' : ''}`}>
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                      <img
                        src={service.image}
                        alt={`${service.title} visual`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#ed8416]/20 mix-blend-multiply pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ── Partner Ticker ── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">
          Technology Partners
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-16 animate-ticker" style={{ width: 'max-content' }}>
            {partnerLogos.map((logo, i) => (
              <div key={i} className="flex items-center justify-center h-12 w-40 shrink-0 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-br from-[#ed8416] to-[#9d5710] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to simplify the complex?
            </h2>
            <p className="text-white/80 text-xl mb-10">
              Let's talk about how Sunfinity can accelerate your data, team, or business goals.
            </p>
            <a
              href="mailto:sales@sunfinity.tech"
              className="inline-flex items-center gap-2 bg-white text-[#ed8416] px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-xl"
            >
              <span>sales@sunfinity.tech</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
