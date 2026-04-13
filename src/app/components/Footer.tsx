import { Mail, Phone, Linkedin, MapPin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img
              src="/images/sunfinity-logo.png"
              alt="Sunfinity Technology Solutions"
              className="h-20 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Simplifying The Complex — Data, Sales, and Talent for the AI-driven world.
            </p>
          </div>

          {/* Registered Office */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Registered Office</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#ed8416] shrink-0" />
                <span>H-18 Runals Deepmala, Pimple Saudagar, Pune 411027, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ed8416] shrink-0" />
                <a href="tel:9819332161" className="hover:text-[#ed8416] transition-colors">
                  +91 98193 32161
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ed8416] shrink-0" />
                <a href="mailto:sales@sunfinity.tech" className="hover:text-[#ed8416] transition-colors">
                  sales@sunfinity.tech
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#ed8416] shrink-0" />
                <a
                  href="https://www.linkedin.com/company/sunfintech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ed8416] transition-colors"
                >
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-[#ed8416] shrink-0" />
                <a
                  href="https://x.com/https://twitter.com/sunfinitytech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ed8416] transition-colors"
                >
                  X(Twitter)
                </a>
              </div>
            </div>
          </div>

          {/* Satellite Offices */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Geographical Presence</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ed8416] shrink-0" />
                <span>Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ed8416] shrink-0" />
                <span>New Delhi</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ed8416] shrink-0" />
                <span>Pune</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Sunfinity Technology Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
