import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'

const DashboardLayout = ({ title = 'Dashboard', children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = useMemo(
    () => [
      { path: '/', label: 'Dashboard' },
      { path: '/user-access', label: 'User & Access' },
      { path: '/payment', label: 'Payment Management' },
      { path: '/offers', label: 'Offer Management' },
      { path: '/reports', label: 'Reports Management' },
      { path: '/leads', label: 'Leads Management' },
      { path: '/landing-cms', label: 'Landing Page CMS' },
    ],
    [],
  )

  return (
    <div className="min-h-screen bg-[#0b1f2a]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[260px] transform bg-[#0b1f2a] transition-transform duration-300 md:relative md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="px-4 py-5 text-xl font-bold text-white">POS Admin</div>
            <nav className="flex-1 space-y-1 px-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-teal-500 text-white'
                        : 'text-slate-200 hover:bg-white/10'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Panel */}
        <div className="flex min-h-screen flex-1 flex-col md:pl-[260px]">
          {/* Navbar */}
          <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0e2a33] px-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open sidebar"
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={18} />
              </button>
              <h1 className="text-lg font-semibold text-white md:text-xl">{title}</h1>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden md:flex">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-2.5 text-slate-300" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="h-9 w-56 rounded-lg border border-white/10 bg-[#0b1f2a] pl-9 pr-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
              <span className="hidden md:inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                Role: Admin
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 text-sm font-bold text-white">
                SA
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-8 text-white">
            <div className="space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
