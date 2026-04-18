import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navigation() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const linkClass = (path: string) =>
    `transition-colors font-medium ${
      isActive(path) ? 'text-[#ed8416]' : 'text-gray-700 hover:text-[#ed8416]'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center py-1">
            <img
              src="/images/sunfinity-logo.png"
              alt="Sunfinity Technology Solutions"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={linkClass('/')}>Home</Link>
            <Link to="/about" className={linkClass('/about')}>About</Link>
            <Link to="/partnerships" className={linkClass('/partnerships')}>Partnerships</Link>

            {/* Services dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-[#ed8416] font-medium transition-colors">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                  <Link
                    to="/advanced-data-services"
                    className="block px-5 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-[#ed8416] transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    Advanced Data Services
                  </Link>
                  <Link
                    to="/upskilling-services"
                    className="block px-5 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-[#ed8416] transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    UpSkilling Services
                  </Link>
                  <Link
                    to="/business-intelligence-and-analytics"
                    className="block px-5 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-[#ed8416] transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    Business Intelligence & Analytics
                  </Link>
                </div>
              )}
            </div>

            <a
              href="mailto:sales@sunfinity.tech"
              className="bg-[#ed8416] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#c96d12] transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/partnerships', label: 'Partnerships' },
              { to: '/advanced-data-services', label: 'Advanced Data Services' },
              { to: '/upskilling-services', label: 'UpSkilling Services' },
              { to: '/business-intelligence-and-analytics', label: 'Business Intelligence & Analytics' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block px-4 py-2.5 text-gray-700 hover:text-[#ed8416] hover:bg-orange-50 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <a
              href="mailto:sales@sunfinity.tech"
              className="block mx-4 mt-2 bg-[#ed8416] text-white px-5 py-2.5 rounded-lg font-medium text-center"
            >
              Contact Us
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
