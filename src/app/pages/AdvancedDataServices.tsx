import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Server, Cog, CheckCircle, ChevronDown } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

type ServiceDetail = {
  title: string
  summary: string
  points: string[]
  outcome: string
}

type ServiceSection = {
  icon: typeof Database
  title: string
  strapline: string
  /** Section hero image (public path) */
  imageSrc: string
  imageAlt: string
  details: ServiceDetail[]
}

const dbServiceSections: ServiceSection[] = [
  {
    icon: Database,
    title: 'Database Consulting',
    strapline: 'Technology, licensing, architecture, and total-cost decisions with confidence.',
    imageSrc: '/images/Advanced Data Services .jpg',
    imageAlt: 'Database consulting and architecture',
    details: [
      {
        title: 'Technology selection',
        summary:
          'Choosing the wrong database can create years of technical debt. We run a structured, vendor-neutral evaluation shaped by your workload, operating model, and long-term scalability.',
        points: [
          'Evaluate relational, NoSQL, NewSQL, time-series, and graph options against real query patterns',
          'Factor in team capability, operational maturity, and maintainability — not only raw performance',
          'Applicable for greenfield builds, legacy migrations, and modernization initiatives',
        ],
        outcome: 'A clear, justified technology recommendation with scoring rationale and adoption roadmap.',
      },
      {
        title: 'Licensing advisory',
        summary:
          'Database licensing is one of the highest-risk and highest-cost line items in enterprise IT. We decode the fine print before commitment.',
        points: [
          'Analyze Oracle, SQL Server, IBM, and open-source licensing models to surface exposure',
          'Perform audit-readiness checks and identify compliance gaps proactively',
          'Support commercial-to-open-source and pricing-model transitions with minimal disruption',
        ],
        outcome: 'Actionable licensing guidance that protects cost and compliance before an audit forces action.',
      },
      {
        title: 'Architecture review',
        summary:
          'Architectures that work at 10,000 users can fail silently at 10 million. We uncover structural risks before they become incidents.',
        points: [
          'Assess schema design, indexing strategy, replication topology, and failover readiness',
          'Review query behavior against your SLA and throughput profile',
          'Deliver prioritized remediations your team can execute immediately',
        ],
        outcome: 'A practical resilience and scalability roadmap tuned to your real growth trajectory.',
      },
      {
        title: 'TCO analysis',
        summary:
          'The sticker price is rarely the full cost. We model licensing, infrastructure, support, staffing, and downtime impact over time.',
        points: [
          'Build a comprehensive 3–5 year cost model across on-prem, cloud, and hybrid scenarios',
          'Align finance and engineering around defensible assumptions and comparable options',
          'Identify hidden savings in license posture, cloud usage, and operational overhead',
        ],
        outcome: 'A finance-ready TCO view leadership can use for confident investment decisions.',
      },
    ],
  },
  {
    icon: Server,
    title: 'Implementation & Migration',
    strapline: 'Faster, safer migrations with complete planning, dependency visibility, and controlled cutover.',
    imageSrc: '/images/hero-bg.jpg',
    imageAlt: 'Data infrastructure and migration',
    details: [
      {
        title: 'Assessment & planning',
        summary:
          'Most migration failures are planning failures. We baseline your estate and map risk, sequencing, rollback, and stakeholder impact before data moves.',
        points: [
          'Inventory databases, schemas, jobs, procedures, and integrations end-to-end',
          'Score migration complexity and risk for each component',
          'Build a phased roadmap with rollback checkpoints and realistic timelines',
        ],
        outcome: 'A migration plan engineers trust and leadership can approve with confidence.',
      },
      {
        title: 'AI-accelerated migration',
        summary:
          'We combine AI-assisted conversion with expert review to reduce migration effort while maintaining correctness and control.',
        points: [
          'Automate schema/DDL conversion across major platforms',
          'Use AI-assisted translation for procedures, triggers, and query logic with human validation',
          'Generate validation tests to verify correctness at scale',
        ],
        outcome: 'A materially faster migration program with lower disruption and strong quality gates.',
      },
      {
        title: 'Dependency analysis',
        summary:
          'Databases are deeply connected to apps, ETL, APIs, and reports. We map dependency blast radius before any transition.',
        points: [
          'Discover upstream/downstream dependencies across application and data pipelines',
          'Visualize dependency depth to sequence migrations safely',
          'Surface undocumented touchpoints that often cause post-go-live failures',
        ],
        outcome: 'A validated dependency map that removes hidden migration surprises.',
      },
      {
        title: 'Zero-downtime migrations',
        summary:
          'For always-on systems, we architect live migration patterns that keep source and target synchronized throughout transition.',
        points: [
          'Implement CDC/dual-write synchronization strategies',
          'Run continuous validation during migration, not only at final cutover',
          'Execute staged cutover with rollback controls and real-time monitoring',
        ],
        outcome: 'Production cutovers users barely notice, with no compromise on reliability.',
      },
    ],
  },
  {
    icon: Cog,
    title: 'Managed Services',
    strapline: '24x7 operational ownership to keep databases secure, performant, and incident-ready.',
    imageSrc: '/images/business-intelligence.jpg',
    imageAlt: 'Operations, monitoring, and managed data services',
    details: [
      {
        title: '24x7 support',
        summary:
          'Critical database incidents do not follow business hours. Our DBAs provide around-the-clock support with clear SLAs and escalation paths.',
        points: [
          '24x7 response and resolution coverage with committed SLAs',
          'Incident handling by experienced DBAs, not scripted L1 triage',
          'Post-incident RCA and hardening recommendations',
        ],
        outcome: 'Expert support availability at any hour, reducing pressure on internal on-call teams.',
      },
      {
        title: 'Onsite & remote options',
        summary:
          'We adapt delivery to your security and operating model: onsite, remote, or hybrid managed services.',
        points: [
          'Onsite DBA presence for sensitive or regulated environments',
          'Secure remote operations for cloud-first and distributed teams',
          'Hybrid shift handovers for continuity across time zones',
        ],
        outcome: 'A managed services model tailored to your operational reality.',
      },
      {
        title: 'Community version ownership',
        summary:
          'We bring enterprise-grade discipline to open-source estates so your team is not overloaded with patching, tuning, and runbook ownership.',
        points: [
          'Proactive patch and upgrade cadence with production testing',
          'Workload-specific tuning and baseline configuration',
          'Runbooks, backups, and recovery controls with zero single-person dependency',
        ],
        outcome: 'Commercial-grade reliability on open-source databases with lower TCO.',
      },
      {
        title: 'Performance monitoring',
        summary:
          'We detect degradation early by tracking query behavior, wait events, lock contention, and capacity trends.',
        points: [
          'Continuous monitoring across performance and resource dimensions',
          'Signal-first alerting tuned to reduce false positives',
          'Deep query and execution-plan reviews to address root causes',
        ],
        outcome: 'A stable, performant data layer with fewer user-visible incidents.',
      },
    ],
  },
]

export default function AdvancedDataServices() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

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
              Building the foundation for your agentic enterprises
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 md:py-16 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
              We are an end-to-end database service provider. Our core expertise lies in{' '}
              <span className="text-gray-900 font-semibold">PostgreSQL, MongoDB,</span> and{' '}
              <span className="text-gray-900 font-semibold">Elastic</span> — supporting commercial as well as
              community versions.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {['PostgreSQL', 'MongoDB', 'Elastic', 'EDB Postgres', 'YugabyteDB'].map((tech) => (
                <span
                  key={tech}
                  className="bg-orange-50/90 text-[#ed8416] border border-orange-100 px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Database services */}
      <section className="py-16 md:py-20 bg-[#f8f8f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ed8416] mb-3">What we deliver</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">Database Services</h2>
            <p className="text-[#ed8416] font-semibold text-sm md:text-base">Design · Implementation · Maintenance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-12 md:mb-14"
          >
            <div className="rounded-2xl border border-stone-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-6 py-5 md:px-8 md:py-6 ring-1 ring-black/[0.02]">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center md:text-left">
                In the modern world, data has become even more important. How it is architected and managed will
                define the winners in the GenAI and agentic era.
              </p>
            </div>
          </motion.div>

          <div className="space-y-16 md:space-y-20">
            {dbServiceSections.map((service, idx) => {
              const Icon = service.icon
              const imageOnLeft = idx % 2 === 1

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="rounded-2xl border border-gray-200/90 bg-white shadow-sm overflow-hidden"
                >
                  {/* Zigzag: text + image */}
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div
                      className={`flex flex-col justify-center px-6 py-10 md:px-10 md:py-12 lg:px-12 ${
                        imageOnLeft ? 'order-2 lg:order-2' : 'order-1 lg:order-1'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-[#ed8416]" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-[0.95rem] md:text-base max-w-xl">
                        {service.strapline}
                      </p>
                    </div>

                    <div
                      className={`relative min-h-[220px] lg:min-h-[280px] border-t border-gray-100 lg:border-t-0 lg:border-l border-gray-100 ${
                        imageOnLeft ? 'order-1 lg:order-1 lg:border-r lg:border-l-0' : 'order-2 lg:order-2'
                      }`}
                    >
                      <img
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-gray-900/10 to-transparent lg:bg-gradient-to-r lg:from-gray-900/35 lg:via-transparent lg:to-transparent"
                        aria-hidden
                      />
                    </div>
                  </div>

                  {/* Accordions — full width under the row */}
                  <div className="border-t border-gray-100 bg-[#fafaf9] px-4 py-4 md:px-6 md:py-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 px-1">Capabilities</p>
                    <div className="space-y-2 max-w-4xl mx-auto">
                      {service.details.map((detail, detailIdx) => {
                        const itemKey = `${service.title}-${detailIdx}`
                        const isOpen = Boolean(openItems[itemKey])
                        return (
                          <div
                            key={detail.title}
                            className="rounded-xl border border-gray-200/90 bg-white overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                          >
                            <button
                              type="button"
                              onClick={() => toggleItem(itemKey)}
                              className="w-full text-left px-4 py-3.5 md:px-5 md:py-4 hover:bg-gray-50/80 transition-colors flex items-center justify-between gap-4"
                            >
                              <span className="font-semibold text-gray-900 text-sm md:text-[0.95rem]">{detail.title}</span>
                              <ChevronDown
                                className={`w-5 h-5 text-[#ed8416] shrink-0 transition-transform duration-200 ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-4 pb-4 pt-0 md:px-5 md:pb-5 border-t border-gray-100 bg-white">
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 pt-4">{detail.summary}</p>
                                <ul className="space-y-2.5 mb-4">
                                  {detail.points.map((point) => (
                                    <li key={point} className="flex items-start gap-2.5 text-sm text-gray-600">
                                      <CheckCircle className="w-4 h-4 text-[#ed8416] shrink-0 mt-0.5" />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                                <p className="text-sm text-gray-700 border-t border-gray-100 pt-3 mt-1">
                                  <span className="font-semibold text-gray-900">Outcome: </span>
                                  {detail.outcome}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.article>
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
            <br />
            Reach out to us for a free migration assessment.
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
