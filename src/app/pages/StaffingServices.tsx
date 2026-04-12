import { motion } from 'framer-motion'
import { Users, Search, FileCheck, CheckCircle, Briefcase } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const services = [
  {
    icon: Search,
    title: 'Talent Acquisition',
    description:
      'Talent identification is tough and Presales identification is tougher. Our deep understanding of the function, ability to dig deep into the market and identify the right potential makes us the perfect partner for Presales talent hiring.',
    points: ['Presales specialist hiring', 'Market mapping', 'Cultural fit assessment', 'End-to-end recruitment'],
  },
  {
    icon: FileCheck,
    title: 'Contract Staffing',
    description:
      'Our strong talent acquisition capabilities, streamlined HR processes, and strict adherence to compliance make us the right fit for contract staffing. Specialization in Database, Infrastructure, Cloud, and Analytics resourcing.',
    points: ['Database specialists', 'Cloud architects', 'Infrastructure engineers', 'Analytics professionals'],
  },
]

const specializations = [
  {
    title: 'Data Services & Architecture',
    desc: 'Database engineers, data architects, ETL specialists, and analytics professionals.',
    icon: '🗄️',
  },
  {
    title: 'Data Center & Cloud Solutions',
    desc: 'Cloud architects, DevOps engineers, infrastructure specialists, and migration experts.',
    icon: '☁️',
  },
  {
    title: 'Solution Engineering Services',
    desc: 'Presales engineers, solution architects, technical consultants, and subject matter experts.',
    icon: '⚙️',
  },
]

export default function StaffingServices() {
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
              Complex Talent, Simplified
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6">Staffing Services</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Talent Services for the AI-Driven World
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
              <span className="text-[#ed8416] font-semibold text-sm uppercase tracking-widest">The Right People, Right Now</span>
              <h2 className="text-4xl font-bold text-gray-900">
                Elite talent for an AI-transformed workplace
              </h2>
              <p className="text-gray-600 leading-relaxed">
                As AI transforms the workplace, the "right" people are more valuable than ever. Organisations now require fewer resources, but those resources must possess a much higher level of specialised skill.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At Sunfinity, we bridge the talent gap by providing elite professionals across the technology spectrum — end-to-end talent services ranging from Acquisition, Outsourcing, and Contract Staffing.
              </p>

              <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-[#ed8416]">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-[#ed8416] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Who We Serve</p>
                    <p className="text-gray-600 text-sm">We specialise in supporting System Integrators, OEMs, and End Clients — delivering specialists who can hit the ground running.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { label: 'System Integrators', icon: '🔗' },
                  { label: 'OEMs', icon: '🏭' },
                  { label: 'End Clients', icon: '🏢' },
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Staffing Process</h3>
                  <div className="space-y-5">
                    {[
                      { step: '01', title: 'Requirement Deep Dive', desc: 'Understand the technical and cultural needs in depth.' },
                      { step: '02', title: 'Market Mapping', desc: 'Identify best-fit candidates from our curated talent network.' },
                      { step: '03', title: 'Rigorous Screening', desc: 'Technical assessments, interviews, and background checks.' },
                      { step: '04', title: 'Seamless Onboarding', desc: 'HR compliance, contracts, and smooth deployment.' },
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
            <p className="text-gray-600 text-lg">End-to-end talent solutions tailored to your needs</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">{service.description}</p>
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

      {/* Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Specialisations</h2>
            <p className="text-gray-600 text-lg">Deep expertise across three critical technology domains</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {specializations.map((spec, idx) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-b from-orange-50 to-white border border-orange-100 hover:border-[#ed8416] transition-colors"
              >
                <div className="text-5xl mb-5">{spec.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{spec.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{spec.desc}</p>
              </motion.div>
            ))}
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
            <h2 className="text-4xl font-bold text-white mb-4">Find your next technology expert</h2>
            <p className="text-white/80 text-lg mb-8">
              Tell us about your requirements and we'll match you with the right talent.
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
