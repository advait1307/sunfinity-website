import { Link } from 'react-router-dom'
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/partnerships', label: 'Partnerships' },
  { to: '/blogs', label: 'Blog' },
  { to: '/podcasts', label: 'Podcasts' },
  { to: '/careers', label: 'Careers' },
]

const serviceLinks = [
  { to: '/advanced-data-services', label: 'Advanced Data Services' },
  { to: '/upskilling-services', label: 'UpSkilling Services' },
  { to: '/business-intelligence-and-analytics', label: 'BI & Analytics' }
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-14 border-b border-gray-800/80">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-2">
            <div className="h-30 overflow-hidden">  {/* controls how much from top is visible */}
            <img
              src="/images/sunfinity-logo-footer.png"
              alt="Sunfinity Technology Solutions"
              className="w-auto object-cover object-top" 
              style={{ height: '140px' }}
            />
          </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Simplifying the complex — data, sales, and talent for the AI-driven world.
            </p>
            <a
              href="https://www.linkedin.com/company/sunfintech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-1 text-sm text-gray-400 hover:text-[#ed8416] transition-colors"
            >
              <Linkedin className="w-4 h-4 text-[#ed8416]" />
              Follow us on LinkedIn
            </a>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#ed8416] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  H-18 Runals Deepmala, Pimple Saudagar, Pune 411027, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ed8416] shrink-0" />
                <a href="tel:+919819332161" className="hover:text-[#ed8416] transition-colors">
                  +91 98193 32161
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ed8416] shrink-0" />
                <a href="mailto:sales@sunfinity.tech" className="hover:text-[#ed8416] transition-colors break-all">
                  sales@sunfinity.tech
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Presence</p>
            <p className="text-sm text-gray-400">Mumbai · New Delhi · Pune</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Sunfinity Technology Solutions. All rights reserved.</p>
          <Link to="/careers" className="text-[#ed8416] hover:text-orange-400 font-medium transition-colors">
            We are hiring →
          </Link>
        </div>
      </div>
    </footer>
  )
}
