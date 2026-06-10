import { Link } from "react-router"
import { motion } from "framer-motion"
import { Sparkles, Target, Brain, TrendingUp } from "lucide-react"

const features = [
  { icon: Target, text: "Job-specific interview strategies" },
  { icon: Brain, text: "AI-powered question generation" },
  { icon: TrendingUp, text: "Personalized skill gap analysis" },
]

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex bg-surface">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-surface to-surface" />
        <div className="absolute top-1/4 -left-20 size-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 size-80 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Sparkles className="size-5 text-violet-400" />
            </div>
            <span className="text-xl font-semibold tracking-tight">MockMate</span>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight leading-tight text-zinc-100">
                Ace your next
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                  interview
                </span>
              </h1>
              <p className="mt-4 text-zinc-400 text-lg max-w-md leading-relaxed">
                AI-powered preparation tailored to your resume and target role.
              </p>
            </div>

            <ul className="space-y-4">
              {features.map(({ icon: Icon, text }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <div className="size-8 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
                    <Icon className="size-4 text-violet-400" />
                  </div>
                  {text}
                </motion.li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} MockMate. All rights reserved.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Sparkles className="size-5 text-violet-400" />
            <span className="font-semibold">MockMate</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100">{title}</h2>
            {subtitle && <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>}
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  )
}

export function AuthFooterLink({ text, linkText, to }) {
  return (
    <p className="mt-6 text-center text-sm text-zinc-500">
      {text}{" "}
      <Link to={to} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
        {linkText}
      </Link>
    </p>
  )
}
