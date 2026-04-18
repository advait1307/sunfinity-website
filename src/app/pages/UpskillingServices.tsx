import { motion } from 'framer-motion'
import { GraduationCap, TrendingUp, Target, CheckCircle, Quote } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const essentialSkills = [
  'Technical Win',
  'Building Trust',
  'Validation',
  'Value-first conversations',
  'Driving revenue through lasting relationships',
]

const verticals = [
  { title: 'Banking & Capital Markets', desc: 'Decoding core operations, risk management, and digital transformation priorities.' },
  { title: 'Insurance', desc: 'Navigating the complexities of claims, underwriting, and policyholder lifecycles.' },
  { title: 'Telecom', desc: 'Understanding the shift from connectivity to platform-based ecosystems.' },
  { title: 'Pharma', desc: 'Unpacking the R&D pipeline, compliance landscapes, and patient-centric outcomes.' },
]

export default function UpskillingServices() {
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
              Complex Sales, Simplified
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6">UpSkilling Services</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">Strengthening Technical Sales Functions</p>
          </motion.div>
        </div>
      </section>

      {/* The Force Multiplier */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/upskilling.jpg"
                alt="UpSkilling Services"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-[#ed8416] font-semibold text-sm uppercase tracking-widest">The Force Multiplier</span>
              <h2 className="text-4xl font-bold text-gray-900">
                Where technical excellence meets human connection
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Solution Engineers are pivotal in driving value-sales. For a presales team, technical excellence is a <strong>"must"</strong> — however soft skills are the <strong>"force multiplier."</strong>
              </p>
              <p className="text-gray-600 leading-relaxed">
                The team may be able to architect a complex hybrid cloud solution or a data management ecosystem, but the deal is often won or lost based on how that solution is communicated, contextualized, and connected to the buyer's pain points.
              </p>

              {/* Stats */}
              <div className="space-y-4">
                <div className="bg-orange-50 p-5 rounded-xl border-l-4 border-[#ed8416]">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-[#ed8416] shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm font-medium">
                      Organizations that prioritize soft skills see a <strong className="text-[#ed8416]">26% increase in revenue growth</strong> compared to those that do not.
                    </p>
                  </div>
                </div>
                <div className="bg-orange-50 p-5 rounded-xl border-l-4 border-[#ed8416]">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-[#ed8416] shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm font-medium">
                      <strong className="text-[#ed8416]">85% of job success</strong> comes from well-developed soft skills — communication, empathy, negotiation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SIQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-[#ed8416] font-semibold text-sm uppercase tracking-widest">Our Methodology</span>
              <h2 className="text-4xl font-bold text-gray-900">
                Sellers' Interpersonal Quotient (SIQ)
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We partner with <strong>Mastering Technical Sales — USA</strong> to bring their world-renowned curriculum to India. Our SIQ framework equips technical teams to master the human side of selling.
              </p>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Essential Skills Covered:</h3>
                <ul className="space-y-3">
                  {essentialSkills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#ed8416] shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-[#ed8416] to-[#9d5710] rounded-3xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Three Training Pillars</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Specialized Soft Skills', desc: 'Communication, empathy, and negotiation frameworks tailored for technical sales teams.' },
                    { title: 'Coaching', desc: 'One-on-one and group coaching programs with real-world scenario practice.' },
                    { title: 'Industry Basics', desc: 'Deep vertical knowledge across Banking, Insurance, Telecom, and Pharma.' },
                  ].map((item) => (
                    <div key={item.title} className="bg-white/15 rounded-xl p-5">
                      <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                      <p className="text-white/75 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Verticals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Industry Verticals</h2>
            <p className="text-gray-600 text-lg">Deep domain knowledge across key sectors</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verticals.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-orange-50 rounded-2xl p-6 border border-orange-100 hover:border-[#ed8416] transition-colors"
              >
                <Target className="w-8 h-8 text-[#ed8416] mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#ed8416] to-[#9d5710]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Equip your team to win more deals</h2>
          <p className="text-white/80 text-lg mb-8">
            Let's discuss how the SIQ program can transform your technical sales team.
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
