import { motion } from 'framer-motion'
import { ClipboardCheck, Rocket, Users, Cloud, CheckCircle, Briefcase } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const offerings = [
  {
    icon: ClipboardCheck,
    title: 'Salesforce Consulting Services',
    description:
      'From health checks and process assessments to strategic roadmaps, we help you optimise your Salesforce investment and drive lasting business value.',
  },
  {
    icon: Rocket,
    title: 'Salesforce Implementation Services',
    description:
      'We manage the entire Salesforce implementation journey—from design and development to testing, deployment, data migration and third-party integrations.',
  },
  {
    icon: Users,
    title: 'Empower. Support. Evolve.',
    description:
      'We drive Salesforce adoption through effective user training and proactive, ongoing support, keeping your CRM running smoothly, up to date and aligned with your evolving business needs.',
  },
  {
    icon: Cloud,
    title: 'Salesforce Cloud Staffing Services',
    description:
      'We provide skilled Salesforce and cloud professionals across architecture, development and administration to strengthen your teams, accelerate delivery and drive project success.',
  },
]

const industries = ['BFSI', 'ITES', 'Manufacturing', 'Higher Education', 'Retail']
const expertise = ['Sales Cloud', 'Service Cloud', 'Tableau Platform', 'Agentforce']

export default function SalesforceConsulting() {
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
              Complex CRM, Simplified
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Salesforce Consulting & Implementation
            </h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              End-to-end Salesforce services, from health checks and roadmaps through implementation, adoption, and staffing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-[#ed8416] font-semibold text-sm uppercase tracking-widest">End-to-End Expertise</span>
              <h2 className="text-4xl font-bold text-gray-900">
                Complete Salesforce services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                From health checks and process assessments to strategic roadmaps, we help you optimise your Salesforce investment and drive lasting business value.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We manage the entire Salesforce implementation journey—from design and development to testing, deployment, data migration and third-party integrations.
              </p>

              <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-[#ed8416]">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-[#ed8416] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Who We Serve</p>
                    <p className="text-gray-600 text-sm">We serve organisations across BFSI, ITES, Manufacturing, Higher Education, and Retail.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { label: 'BFSI', icon: '🏦' },
                  { label: 'ITES', icon: '💼' },
                  { label: 'Manufacturing', icon: '🏭' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-xs font-semibold text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-[#ed8416] to-[#9d5710] rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-[22px] p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Approach</h3>
                  <div className="space-y-5">
                    {[
                      { step: '01', title: 'Consulting', desc: 'Health checks, process assessments, and strategic roadmaps.' },
                      { step: '02', title: 'Implementation', desc: 'Design, development, testing, deployment, and integrations.' },
                      { step: '03', title: 'Adoption', desc: 'User training and proactive, ongoing support.' },
                      { step: '04', title: 'Staffing', desc: 'Skilled professionals across architecture, development, and administration.' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <span className="text-3xl font-black text-[#ed8416] opacity-30 leading-none">{item.step}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Services</h2>
            <p className="text-gray-600 text-lg">Comprehensive Salesforce solutions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-t-4 border-[#ed8416]"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#ed8416]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industries & Expertise */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-14">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Industries we serve</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 bg-white border border-orange-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <CheckCircle className="w-4 h-4 text-[#ed8416]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our expertise</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {expertise.map((item) => (
                <span
                  key={item}
                  className="bg-orange-50 text-[#ed8416] border border-orange-200/70 px-4 py-1.5 rounded-full text-sm font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#ed8416] to-[#9d5710]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to get more from Salesforce?</h2>
            <p className="text-white/80 text-lg mb-8">
              Talk to us about consulting, implementation, adoption, or staffing.
            </p>
            <a
              href="mailto:sales@sunfinity.tech"
              className="inline-flex items-center gap-2 bg-white text-[#ed8416] px-10 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
