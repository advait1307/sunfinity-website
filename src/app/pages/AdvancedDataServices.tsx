import { motion } from 'framer-motion'
import { Database, Server, BarChart3, Cog, CheckCircle } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const dbServices = [
  {
    icon: Database,
    title: 'Database Consulting',
    description:
      'Expert, vendor-neutral guidance to help you make the right database decisions — covering technology selection, licensing models, architectural fit, and total cost of ownership.',
    points: ['Technology selection', 'Licensing advisory', 'Architecture review', 'TCO analysis'],
  },
  {
    icon: Server,
    title: 'Implementation & Migration',
    description:
      'Thorough assessments & planning with industry-leading migration tools and AI accelerators for faster migrations. Code analysis for assessing application dependencies.',
    points: ['Assessment & planning', 'AI-accelerated migration', 'Dependency analysis', 'Zero-downtime migrations'],
  },
  {
    icon: Cog,
    title: 'Managed Services',
    description:
      'Trained resources across various databases with 24×7 onsite/remote managed services. Complete ownership of community versions to free your internal teams.',
    points: ['24×7 support', 'Onsite & remote options', 'Community version ownership', 'Performance monitoring'],
  },
]

const biServices = [
  {
    icon: BarChart3,
    title: 'Visualization & Dashboard Development',
    description:
      'Business-aligned dashboards displaying key performance indicators in a user-friendly manner — helping leaders track the business more effectively.',
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
      'Ideal for small businesses with limited analytical needs — move out of Excel at affordable cost with our unique managed analytics offering.',
    points: ['Excel migration', 'Small business focused', 'Affordable packages', 'Ongoing support'],
  },
]

export default function AdvancedDataServices() {
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
              Complex Data, Simplified
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6">Advanced Data Services</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Projects · Maintenance · Staffing
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
              We are an end-to-end database service provider. Our core expertise lies in <strong className="text-gray-900">PostgreSQL, MongoDB,</strong> and <strong className="text-gray-900">Elastic</strong> — supporting commercial as well as community versions.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['PostgreSQL', 'MongoDB', 'Elastic', 'EDB Postgres', 'Yugabyte DB', 'Oracle'].map((tech) => (
                <span key={tech} className="bg-orange-50 text-[#ed8416] border border-orange-200 px-4 py-1.5 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Database Engineering */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Database Engineering</h2>
            <p className="text-[#ed8416] font-semibold">Projects · Maintenance · Staffing</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {dbServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-t-4 border-[#ed8416]"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#ed8416]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#ed8416] shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* BI & Analytics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">BI & Analytics</h2>
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
                  className="bg-gray-50 rounded-2xl p-8 hover:bg-orange-50 transition-colors border border-gray-100"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#ed8416]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#ed8416] shrink-0" />
                        {p}
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
          <h2 className="text-4xl font-bold text-white mb-4">Modernize your data infrastructure</h2>
          <p className="text-white/80 text-lg mb-8">
            Talk to our data experts to chart the right path forward.
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
