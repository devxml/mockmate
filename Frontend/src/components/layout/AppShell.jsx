import { Link, useLocation, useNavigate } from "react-router"
import { motion } from "framer-motion"
import {
  Sparkles,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
} from "lucide-react"
import { useAuth } from "../../features/auth/hooks/useAuth"
import { Button } from "../ui/Button"
import { cn } from "../../lib/cn"

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
]

export function AppShell({ children, showBack = false }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, handleLogout } = useAuth()
  const isInterview = location.pathname.startsWith("/interview/")

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col border-r border-zinc-800/80 bg-surface-raised shrink-0">
        <div className="p-5 border-b border-zinc-800/80">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="size-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Sparkles className="size-4 text-violet-400" />
            </div>
            <span className="font-semibold text-zinc-100 tracking-tight">MockMate</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-violet-500/10 text-violet-400"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800/80">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="size-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">{user?.username}</p>
              <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            icon={LogOut}
            onClick={handleLogout}
          >
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-surface-raised">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="size-5 text-violet-400" />
            <span className="font-semibold text-sm">MockMate</span>
          </Link>
          {isInterview && showBack && (
            <Button variant="ghost" size="sm" icon={ChevronLeft} onClick={() => navigate("/")}>
              Back
            </Button>
          )}
        </header>

        {/* Desktop top bar for interview pages */}
        {isInterview && showBack && (
          <div className="hidden lg:flex items-center px-6 py-3 border-b border-zinc-800/80">
            <Button variant="ghost" size="sm" icon={ChevronLeft} onClick={() => navigate("/")}>
              Back to Dashboard
            </Button>
          </div>
        )}

        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
