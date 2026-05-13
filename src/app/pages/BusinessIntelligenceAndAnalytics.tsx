import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Cog, Server, CheckCircle, ChevronDown } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

type ServiceDetail = {
  title: string
  summary: string
  points: string[]
  outcome: string
}

type BIServiceSection = {
  icon: typeof BarChart3
  title: string
  strapline: string
  /** Partner logo path when available (e.g. Tableau via Salesforce); otherwise the Lucide icon is shown large. */
  logoSrc?: string
  logoAlt?: string
  details: ServiceDetail[]
}

const biServiceSections: BIServiceSection[] = [
  {
    icon: BarChart3,
    title: 'Visualization & Dashboard Development',
    strapline:
      'From KPI dashboards to real-time operations — one trusted view of the metrics that move your business.',
    logoSrc: '/images/salesfobrce-logo.png',
    logoAlt: 'Tableau — Salesforce',
    details: [
      {
        title: 'KPI dashboards',
        summary:
          'Most organizations have data; few have a single, trusted view of the numbers that drive the business. We design KPI dashboards that replace spreadsheet chaos and conflicting reports with one authoritative source of truth.',
        points: [
          'Purpose-built metrics — every KPI is defined, agreed, and tied to a real data source before any chart is built',
          'Role-specific views for operations, finance, sales, and product without noise from other functions',
          'Automated refresh cadences so on-screen numbers stay current — no manual export-and-paste loops',
          'Accessible on desktop, tablet, and large-format displays — including meeting rooms and ops centers',
        ],
        outcome:
          'A single, trusted KPI dashboard your entire organization uses as the starting point for every performance conversation.',
      },
      {
        title: 'Executive reporting',
        summary:
          'Leadership needs the right data in the right format at the right time — not more raw data. We build executive reporting that delivers board-level clarity automatically.',
        points: [
          'High-signal, low-noise reporting for time-pressed executives — trend, variance, and context without clutter',
          'Automated weekly, monthly, and quarterly packs to the right inboxes without manual intervention',
          'One-click drill-down from headline metrics to underlying detail without waiting on analysts',
          'Row- and column-level security so each executive sees only data in scope — with audit trails where required',
        ],
        outcome:
          'Executive reporting that runs itself — saving dozens of hours per month while sharpening visibility into performance.',
      },
      {
        title: 'Self-service analytics',
        summary:
          'When every question routes through the analytics team, the team drowns and the business waits. We put governed exploration in the hands of business users — safely, without SQL.',
        points: [
          'Drag-and-drop exploration on governed, pre-modelled data — freedom to explore without wrong or sensitive numbers',
          'A curated business data catalog with plain-language definitions so anyone can find what they need',
          'Guardrails from day one — explore within approved datasets with role-based protections',
          'Adoption-focused rollout: training, documentation, and enablement so self-service gets used after go-live',
        ],
        outcome:
          'Business teams answer their own questions in minutes — and analytics focuses on deeper, higher-value work.',
      },
      {
        title: 'Real-time insights',
        summary:
          'In fast-moving operations, stale data misleads. We build pipelines and dashboards that close the gap between what is happening and what you know.',
        points: [
          'Streaming pipelines from source to dashboard in seconds — Kafka, Flink, Spark Streaming, and proven patterns',
          'Threshold-based alerting and anomaly detection when metrics cross critical boundaries',
          'Live operational dashboards for fraud, logistics, CX, inventory, and other high-velocity use cases',
          'Blended real-time and historical context in one view — now vs pattern over time',
        ],
        outcome:
          'Operational visibility in seconds, not hours — so teams respond to what is happening now, not what already happened.',
      },
    ],
  },
  {
    icon: Cog,
    title: 'Reporting & MIS Automation',
    strapline:
      'Replace manual report factories with scheduled, validated, multi-channel delivery — and predictable commercial terms.',
    details: [
      {
        title: 'Automated reporting',
        summary:
          'Skilled people still spend hours pulling data, formatting spreadsheets, and emailing reports that are stale on arrival. We replace that with pipelines that run on schedule, accurately, without manual steps.',
        points: [
          'Scheduled delivery on daily, weekly, monthly, and ad-hoc cadences — triggered and distributed automatically',
          'Output to PDF, Excel, email, Slack, Teams, or portals — so stakeholders keep their preferred formats',
          'Built-in validation and reconciliation on every run so numbers are verified before they hit inboxes',
          'Failure alerting and retry logic so broken pipelines never silently ship missing or stale reports',
        ],
        outcome:
          'Hours of manual reporting removed every week — replaced by a pipeline the business can depend on.',
      },
      {
        title: 'MIS dashboards',
        summary:
          'MIS is only valuable when information is timely, accurate, and aligned to real management decisions. We build dashboards around your hierarchy, reporting lines, and accountability metrics.',
        points: [
          'Layered views from frontline leads to department heads to C-suite — right level of detail per role',
          'Variance and trend overlays as standard — see where a metric stands and whether it is moving the right way',
          'Cross-functional visibility across finance, operations, sales, and HR — fewer siloed, conflicting narratives',
          'Refresh cycles tied to source systems so MIS stays as current as operations — without manual pulls',
        ],
        outcome:
          'A management reporting layer the organization trusts — consistent, accurate, and built for daily decisions.',
      },
      {
        title: 'Smart bundles',
        summary:
          'Starting from scratch is slow and expensive. Our bundles combine models, KPIs, templates, and automation so you go live in weeks without sacrificing quality.',
        points: [
          'Pre-built frameworks for finance, sales, HR, operations, and customer metrics — connect your sources',
          'Customizable from a proven base — speed without rigid lock-in; every element can be tailored',
          'Delivery includes models, dashboards, schedules, access, and documentation — a full capability, not just a tool',
          'Lower time-to-value vs bespoke builds — many teams are in production within two to four weeks',
        ],
        outcome:
          'Production-ready reporting at speed — without long blank-canvas scoping and premium custom-only pricing.',
      },
      {
        title: 'Predictable pricing',
        summary:
          'Consulting and data work often suffer scope creep and surprise invoices. Our reporting and MIS offerings use fixed, transparent pricing so you know scope and cost before you start.',
        points: [
          'Fixed-price models for clearly scoped deliverables — fewer mid-project “out of scope” debates',
          'Statements of work with explicit inclusions and exclusions before signature',
          'Subscription options for ongoing managed reporting — one monthly line for delivery, maintenance, and support',
          'Tiers that scale with your business — pay for what you use, scale when you need to',
        ],
        outcome:
          'Cost certainty from day one — finance and procurement can plan, and your team can focus on outcomes, not invoices.',
      },
    ],
  },
  {
    icon: Server,
    title: 'Analytics Managed Services',
    strapline:
      'Purpose-built for growing businesses: migrate off Excel, ship useful analytics quickly, and keep everything supported.',
    details: [
      {
        title: 'Excel migration',
        summary:
          'Excel is powerful until version conflicts, broken formulas, and unclear source of truth slow everyone down. We move you to a structured, automated stack with a controlled transition.',
        points: [
          'Full audit of the Excel estate — every report, formula, and manual step mapped before cutover',
          'Like-for-like automation of critical reports so teams keep familiar outputs while gaining reliability',
          'Migration to a versioned, scalable data layer that grows with the business',
          'Training and change management so adoption is confident, not reluctant',
        ],
        outcome:
          'A clean break from spreadsheet chaos — critical reports replicated, automated, and reliable from go-live.',
      },
      {
        title: 'Small business focused',
        summary:
          'Most vendors optimize for enterprises with big data teams and budgets. We scope, price, and support analytics for organizations that need outcomes without enterprise overhead.',
        points: [
          'Models sized for roughly 5–200 person teams — realistic scope and pricing',
          'Quick-connect integrations with tools you already use — Xero, QuickBooks, Shopify, HubSpot, Google Sheets, and more',
          'A dedicated analyst who learns your business — not an anonymous rotating queue',
          'Business-ready outputs from week one — not a year-long strategy deck before first value',
        ],
        outcome:
          'Analytics capability fit for a much larger company — without building an in-house data department first.',
      },
      {
        title: 'Affordable packages',
        summary:
          'Analytics should not be a luxury. Tiered packages give growing businesses enterprise-quality capability at a predictable monthly cost.',
        points: [
          'Starter, growth, and scale tiers — start with what you need and expand with maturity',
          'Fixed monthly pricing with clear inclusions — fewer usage spikes and seat surprises',
          'Each package covers tooling, setup, automation, dashboards, and support — not a bare product plus costly add-ons',
          'Simple upgrades between tiers as you grow — without re-platforming from scratch',
        ],
        outcome:
          'Real analytics at a price you can commit to — with full visibility into what is included every month.',
      },
      {
        title: 'Ongoing support',
        summary:
          'A dashboard handed over is not the same as a capability that lasts. Data and questions change; we stay embedded to adapt, fix, and extend.',
        points: [
          'Regular reviews so dashboards and reports track how the business has evolved',
          'Proactive monitoring of pipelines and accuracy — fix issues before managers escalate',
          'Ongoing requests for new reports, metrics, and tweaks without a new project for every change',
          'Enablement as staff turns over — new joiners can use the tools with confidence',
        ],
        outcome:
          'Analytics that stays relevant and accurate long after go-live — because the partnership continues.',
      },
    ],
  },
]

export default function BusinessIntelligenceAndAnalytics() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

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

      <section className="py-14 md:py-16 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
              Simplify raw numbers into actionable stories with our{' '}
              <span className="text-gray-900 font-semibold">BI &amp; Analytics</span> services. Powered by{' '}
              <span className="text-gray-900 font-semibold">Tableau</span>, we help you become a more data-driven
              organization.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {['Tableau', 'Visualization', 'MIS Reporting', 'Managed Analytics'].map((capability) => (
                <span
                  key={capability}
                  className="bg-orange-50/90 text-[#ed8416] border border-orange-100 px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {capability}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">BI &amp; Analytics Services</h2>
            <p className="text-[#ed8416] font-semibold text-sm md:text-base">
              Visualization · Reporting · Managed Services
            </p>
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
                From board-ready reporting to self-service exploration and managed analytics for lean teams — we
                design, build, and run the experience end to end.
              </p>
            </div>
          </motion.div>

          <div className="space-y-16 md:space-y-20">
            {biServiceSections.map((service, idx) => {
              const Icon = service.icon
              const logoOnLeft = idx % 2 === 1

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="rounded-2xl border border-gray-200/90 bg-white shadow-sm overflow-hidden"
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div
                      className={`flex flex-col justify-center px-6 py-10 md:px-10 md:py-12 lg:px-12 ${
                        logoOnLeft ? 'order-2 lg:order-2' : 'order-1 lg:order-1'
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
                      className={`relative min-h-[200px] lg:min-h-[260px] border-t border-gray-100 lg:border-t-0 lg:border-l border-gray-100 flex items-center justify-center p-10 md:p-12 ${
                        logoOnLeft ? 'order-1 lg:order-1 lg:border-r lg:border-l-0' : 'order-2 lg:order-2'
                      } bg-gradient-to-br from-orange-50/90 via-white to-stone-50`}
                    >
                      {service.logoSrc ? (
                        <div className="relative w-full max-w-[220px] aspect-[16/9] flex items-center justify-center rounded-2xl bg-white border border-orange-100/80 shadow-sm p-6">
                          <img
                            src={service.logoSrc}
                            alt={service.logoAlt ?? ''}
                            className="max-h-14 w-auto object-contain"
                          />
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center justify-center gap-3 text-center">
                          <div className="w-24 h-24 rounded-2xl bg-white border border-orange-100 shadow-sm flex items-center justify-center">
                            <Icon className="w-12 h-12 text-[#ed8416]" strokeWidth={1.25} />
                          </div>
                          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 max-w-[14rem]">
                            Built on governed models, automation, and managed delivery
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 bg-[#fafaf9] px-4 py-4 md:px-6 md:py-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 px-1">
                      Capabilities
                    </p>
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
                              <span className="font-semibold text-gray-900 text-sm md:text-[0.95rem]">
                                {detail.title}
                              </span>
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

      <section className="py-20 bg-gradient-to-br from-[#ed8416] to-[#9d5710]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Turn insights into action</h2>
          <p className="text-white/80 text-lg mb-8">
            Talk to our BI experts to build dashboards and reporting that drive better decisions.
            <br />
            For a free demo, reach out to us.
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
