import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const partners = [
  {
    name: 'EDB Postgres AI',
    logo: '/images/edb-postgres.png',
    description:
      'An enterprise-grade PostgreSQL platform offering advanced performance tuning, enhanced security, and Oracle compatibility for mission-critical workloads.',
  },
  {
    name: 'Yugabyte DB',
    logo: '/images/yugabyte-logo.png',
    description:
      'A distributed SQL database combining the resilience and scalability of NoSQL with the transactional consistency of PostgreSQL — ideal for cloud-native architectures.',
  },
  {
    name: 'Salesforce / Tableau',
    logo: '/images/salesforce-logo.png',
    description:
      'Tableau is the broadest and deepest end-to-end analytics platform with built-in Salesforce AI — helping organizations use data responsibly to drive better business outcomes.',
  },
  {
    name: 'Elastic — The Search AI Company',
    logo: '/images/elastic-logo.png',
    description:
      'The open-source platform that powers search, observability, and security. A real-time distributed search and analytics engine enabling fast, flexible data exploration across massive datasets.',
  },
  {
    name: 'Mastering Technical Sales',
    logo: '/images/mastering-technical-sales-photo.jpeg',
    description:
      "Founded in 2000 by industry veterans John Care and Aron Bohlig, Mastering Technical Sales (MTS) has become the global benchmark for PreSales excellence. Built around the acclaimed Sales Engineer's Handbook, MTS offers the world's most comprehensive training curriculum for Solutions Engineers and Managers. Their specialized coaching and world-class programs equip technical professionals with the skills to master every stage of the deal.",
  },
  {
    name: 'Cloudera',
    logo: '/images/cloudera-logo.png',
    description:
      'Enterprise data platform enabling organizations to operationalize analytics across hybrid and multi-cloud environments with unified governance and security.',
  },
]

export default function Partnerships() {
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
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Ecosystem
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6">Strategic Partnerships</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              We collaborate with industry-leading technology partners to deliver world-class solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scrolling partner ticker */}
      <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
        <div className="flex gap-16 animate-ticker" style={{ width: 'max-content' }}>
          {[...partners, ...partners].map((p, i) => (
            p.logo && (
              <div key={i} className="flex items-center justify-center h-12 w-40 shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
                <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
              </div>
            )
          ))}
        </div>
      </section>

      {/* Partners grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="h-1.5 bg-gradient-to-r from-[#ed8416] to-[#9d5710]" />
                <div className="p-8">
                  {partner.logo && (
                    <div className="h-20 flex items-center justify-start mb-6">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-[160px] object-contain grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{partner.name}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{partner.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Interested in Partnership?</h2>
            <p className="text-gray-600 text-lg mb-8">
              We're always looking to collaborate with innovative technology partners who share our vision of simplifying complexity.
            </p>
            <a
              href="mailto:sales@sunfinity.tech"
              className="inline-flex items-center gap-2 bg-[#ed8416] text-white px-10 py-4 rounded-xl font-semibold hover:bg-[#c96d12] transition-colors shadow-lg"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
