import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const team = [
  {
    name: 'Anshuman Rai',
    title: 'Co-Founder & Chief Business Officer',
    description:
      'More than 25 years of successful career ranging from customer support to sales leadership. Anshuman is passionate about Solution sales and is a champion of client delight.',
    image: '/images/team-anshuman.jpg',
    imagePosition: '50% 0%',
    profileUrl: 'https://www.linkedin.com/in/raianshu/',
  },
  {
    name: 'Sriraman R',
    title: 'Partner & Practice Lead',
    description:
      'Technology leader with over 25 years of experience across solution sales and professional services. Sriraman brings a consultative approach with a track record of delivering impactful digital transformation outcomes.',
    image: '/images/team-sriraman.jpg',
    imagePosition: '50% 14%',
    profileUrl: 'https://www.linkedin.com/in/sriramanr/',
  },
  {
    name: 'Ajay Agrawal',
    title: 'Partner & Practice Head',
    description:
      'Accomplished Senior Solution Architect with 25 years across cloud, integration, and warehousing — renowned for optimizing performance, driving transformational change, and architecting scalable enterprise data platforms.',
    image: '/images/team-ajay.jpg',
    imagePosition: '50% 18%',
    profileUrl: 'https://www.linkedin.com/in/ajay-agrawal-b114178/',
  },
]

export default function About() {
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
              Who We Are
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              About Sunfinity
            </h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
              A young, nimble technology services firm headquartered in Pune, India — built on decades of collective expertise from global technology giants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Foundation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#ed8416] font-semibold text-sm uppercase tracking-widest">Our Foundation</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-6">
                Enterprise expertise.<br />Startup agility.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Built on a foundation of deep industry expertise, Sunfinity is founded and led by veterans from global giants like <strong>Wipro, HPE, Dell EMC, UI Path, Commvault, FIS</strong> and <strong>TCS</strong>. The company combines the agility of a startup with the strategic sophistication of seasoned IT leadership.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                At its core, Sunfinity is dedicated to simplifying complexity — whether that is in the intricate world of Data management or the demanding landscape of modern technical sales.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We operate as a high-impact partner for organisations looking to bridge the gap between technical capability and business value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {[
                { label: 'Combined Leadership Experience', value: '75+ Years' },
                { label: 'Technology Partners', value: '6+' },
                { label: 'Office Locations', value: 'Mumbai, Pune, Delhi' },
                // { label: 'Domains Served', value: 'Data · Sales · Talent' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-5 rounded-xl bg-orange-50 border border-orange-100"
                >
                  <span className="text-gray-600 font-medium">{stat.label}</span>
                  <span className="text-[#ed8416] font-bold text-lg">{stat.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#ed8416] font-semibold text-sm uppercase tracking-widest">The Team</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Leadership</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <a
                  href={member.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn profile`}
                  className="block h-64 md:h-72 bg-gray-100 overflow-hidden"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: member.imagePosition }}
                  />
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#ed8416] font-medium text-sm mb-4">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
