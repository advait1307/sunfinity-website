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
  imageSrc: string
  imageAlt: string
  details: ServiceDetail[]
}

const biServiceSections: BIServiceSection[] = [
  {
    icon: BarChart3,
    title: 'Visualization & Dashboard Development',
    strapline:
      'From KPI dashboards to real-time operations — one trusted view of the metrics that move your business.',
    imageSrc: '/images/visualisation.jpg',   // ← replace with your path
    imageAlt: 'Visualization & Dashboard Development',
    details: [
      {
        title: 'KPI Dashboards',
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
        title: 'Executive Reporting',
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
        title: 'Self-service Analytics',
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
        title: 'Real-time Insights',
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
    imageSrc: '/images/MIS_reports.svg',   // ← replace with your path
    imageAlt: 'Reporting & MIS Automation',
    details: [
      {
        title: 'Automated Reporting',
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
        title: 'MIS Dashboards',
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
        title: 'Smart Bundles',
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
        title: 'Predictable Pricing',
        summary:
          'Consulting and data work often suffer scope creep and surprise invoices. Our reporting and MIS offerings use fixed, transparent pricing so you know scope and cost before you start.',
        points: [
          'Fixed-price models for clearly scoped deliverables — fewer mid-project "out of scope" debates',
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
    imageSrc: '/images/advanced-managed-services.jpg',   // ← replace with your path
    imageAlt: 'Analytics Managed Services',
    details: [
      {
        title: 'Excel Migration',
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
        title: 'Small Business Focused',
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
        title: 'Affordable Packages',
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
        title: 'Ongoing Support',
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
  const [openItems, setOpenItems] = useState<Record<string, string>>({})

  const toggleItem = (serviceTitle: string, detailTitle: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [serviceTitle]: prev[serviceTitle] === detailTitle ? '' : detailTitle,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#ed8416] to-[#7a3f08] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-black/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-white/15 border border-white/20 text-white text-sm font-semibold px-5 py-1.5 rounded-full mb-7 uppercase tracking-widest backdrop-blur-sm">
              Business Analytics, Simplified
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
              Business Intelligence & Analytics
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mx-auto leading-relaxed">
              Visualization · Reporting · Managed Services
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-14 md:py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
              Simplifying raw numbers into actionable stories with our{' '}
              <span className="text-gray-900 font-semibold">BI &amp; Analytics</span> services. Powered by{' '}
              <span className="text-gray-900 font-semibold">Tableau</span>, we help you become a more data-driven
              organization.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {['Tableau', 'Visualization', 'MIS Reporting', 'Managed Analytics'].map((capability) => (
                <span
                  key={capability}
                  className="bg-orange-50 text-[#ed8416] border border-orange-200/70 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide hover:bg-orange-100 transition-colors"
                >
                  {capability}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="pt-8 md:pt-10 pb-16 md:pb-24 bg-[#f8f8f7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ed8416] mb-3">What we deliver</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">BI &amp; Analytics Services</h2>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-400 font-medium">
              <span>Visualization</span>
              <span className="w-1 h-1 rounded-full bg-[#ed8416] inline-block" />
              <span>Reporting</span>
              <span className="w-1 h-1 rounded-full bg-[#ed8416] inline-block" />
              <span>Managed Services</span>
            </div>
          </motion.div>

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-14"
          >
            <div className="relative rounded-2xl border border-orange-200/60 bg-white shadow-sm px-8 py-6 md:px-10 md:py-7 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ed8416] to-[#9d5710] rounded-l-2xl" />
              <p className="text-gray-700 text-base md:text-lg leading-relaxed pl-2">
                From board-ready reporting to self-service exploration and managed analytics for lean teams — we
                design, build, and run the experience end to end.
              </p>
            </div>
          </motion.div>

          {/* Service cards */}
          <div className="space-y-12 md:space-y-16">
            {biServiceSections.map((service, idx) => {
              const Icon = service.icon
              const imageOnLeft = idx % 2 === 1

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.07 }}
                  className="rounded-2xl border border-gray-200/80 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden"
                >
                  <div className="grid lg:grid-cols-2 min-h-[420px]">

                    {/* ── Image panel ── */}
                    <div
                      className={`relative min-h-[260px] lg:min-h-0 overflow-hidden
                        ${imageOnLeft ? 'order-1' : 'order-1 lg:order-2'}
                      `}
                    >
                      <img
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      {/* Subtle gradient overlay for visual polish */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>

                    {/* ── Content panel: title + accordions ── */}
                    <div
                      className={`flex flex-col ${
                        imageOnLeft
                          ? 'order-2 border-l border-gray-100'
                          : 'order-2 lg:order-1 border-r border-gray-100'
                      }`}
                    >
                      {/* Title block */}
                      <div className="px-6 pt-7 pb-6 border-b border-gray-100 bg-white">
                        <div className="w-10 h-10 rounded-xl bg-[#ed8416] flex items-center justify-center mb-4 shadow-sm">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-gray-500 text-sm md:text-[0.9rem] leading-relaxed max-w-sm">
                          {service.strapline}
                        </p>
                      </div>

                      {/* Capabilities label */}
                      <div className="px-6 py-3 border-b border-gray-100 bg-white flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ed8416]">
                          Capabilities
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {service.details.length} topics
                        </span>
                      </div>

                      {/* Accordion items */}
                      <div className="flex-1 divide-y divide-gray-100/80 bg-white">
                        {service.details.map((detail) => {
                          const isOpen = openItems[service.title] === detail.title
                          return (
                            <div key={detail.title}>
                              <button
                                type="button"
                                onClick={() => toggleItem(service.title, detail.title)}
                                className={`w-full text-left px-6 py-4 flex items-center justify-between gap-4 transition-colors duration-150 ${
                                  isOpen ? 'bg-orange-50/50' : 'hover:bg-gray-50/60'
                                }`}
                              >
                                <span
                                  className={`font-semibold text-sm transition-colors duration-150 ${
                                    isOpen ? 'text-[#c96d12]' : 'text-gray-800'
                                  }`}
                                >
                                  {detail.title}
                                </span>
                                <ChevronDown
                                  className={`w-4 h-4 shrink-0 transition-all duration-200 ${
                                    isOpen ? 'rotate-180 text-[#ed8416]' : 'text-gray-300'
                                  }`}
                                />
                              </button>

                              {/* Smooth CSS slide */}
                              <div
                                className="overflow-hidden transition-all duration-300 ease-in-out"
                                style={{ maxHeight: isOpen ? '600px' : '0px' }}
                              >
                                <div className="px-6 pb-5 border-t border-orange-100 bg-orange-50/25">
                                  <p className="text-gray-600 text-sm leading-relaxed pt-4 mb-3">
                                    {detail.summary}
                                  </p>
                                  <ul className="space-y-2.5 mb-4">
                                    {detail.points.map((point) => (
                                      <li key={point} className="flex items-start gap-2.5 text-sm text-gray-600">
                                        <CheckCircle className="w-3.5 h-3.5 text-[#ed8416] shrink-0 mt-[3px]" />
                                        {point}
                                      </li>
                                    ))}
                                  </ul>
                                  {/* Outcome box */}
                                  <div className="flex items-start gap-3 bg-white border border-orange-200/60 rounded-xl px-4 py-3 shadow-[0_1px_4px_rgba(237,132,22,0.07)]">
                                    <span className="text-[#ed8416] font-bold text-sm mt-0.5">→</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                      <span className="font-semibold text-gray-900">Outcome: </span>
                                      {detail.outcome}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#ed8416] to-[#7a3f08] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
              Turn insights into action
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Talk to our BI experts to build dashboards and reporting that drive better decisions.
            </p>
            <a
              href="mailto:sales@sunfinity.tech"
              className="inline-flex items-center gap-2 bg-white text-[#ed8416] px-10 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-xl text-base"
            >
              Reach out for a free demo
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
