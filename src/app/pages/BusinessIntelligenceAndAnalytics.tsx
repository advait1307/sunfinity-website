import { motion } from 'framer-motion'
import { BarChart3, Cog, Server, CheckCircle } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const biServices = [
  {
    icon: BarChart3,
    title: 'Visualization & Dashboard Development',
    description:
      'Business-aligned dashboards displaying key performance indicators in a user-friendly manner - helping leaders track the business more effectively.',
    points: ['KPI dashboards', 'Executive reporting', 'Self-service analytics', 'Real-time insights'],
  },
  {
    icon: Cog,
    title: 'Reporting & MIS Automation',
    description:
      'Streamline MIS automation for creation and delivery of reports, enabling real-time access to critical information at predictable, affordable cost.',
    points: ['Automated reporting', 'MIS dashboards', 'Smart bundles', 'Predictable pricing'],
  },
  {
    icon: Server,
    title: 'Analytics Managed Services',
    description:
      'Ideal for small businesses with limited analytical needs - move out of Excel at affordable cost with our unique managed analytics offering.',
    points: ['Excel migration', 'Small business focused', 'Affordable packages', 'Ongoing support'],
  },
]

export default function BusinessIntelligenceAndAnalytics() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
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
            <span className="inline-block bg-white/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Business Analytics, Simplified
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6">Business Intelligence & Analytics</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Visualization · Reporting · Managed Services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-xl leading-relaxed mb-8">
              Simplify raw numbers into actionable stories with our <strong className="text-gray-900">BI & Analytics</strong> services.
              Powered by <strong className="text-gray-900">Tableau</strong>, we help you transform into an AI and data-driven organization.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Tableau', 'Visualization', 'MIS Reporting', 'Managed Analytics'].map((capability) => (
                <span key={capability} className="bg-orange-50 text-[#ed8416] border border-orange-200 px-4 py-1.5 rounded-full text-sm font-medium">
                  {capability}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BI & Analytics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">BI & Analytics Services</h2>
            <p className="text-[#ed8416] font-semibold">Visualization · Reporting · Managed Services</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {biServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 hover:bg-orange-50 transition-colors border border-gray-100"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#ed8416]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#ed8416] shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#ed8416] to-[#9d5710]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Turn insights into action</h2>
          <p className="text-white/80 text-lg mb-8">
            Talk to our BI experts to build dashboards and reporting that drive better decisions.
          </p>
          <a
            href="mailto:sales@sunfinity.tech"
            className="inline-flex items-center gap-2 bg-white text-[#ed8416] px-10 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
