import { motion } from "framer-motion"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { cn } from "../../lib/cn"

const severityConfig = {
  high: {
    icon: AlertTriangle,
    label: "Critical",
    bar: "bg-red-500",
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  medium: {
    icon: AlertCircle,
    label: "Moderate",
    bar: "bg-amber-500",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  low: {
    icon: Info,
    label: "Minor",
    bar: "bg-emerald-500",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
}

const severityOrder = { high: 0, medium: 1, low: 2 }

export function SkillGapList({ gaps = [] }) {
  const sorted = [...gaps].sort(
    (a, b) => (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3)
  )

  if (!sorted.length) {
    return (
      <p className="text-sm text-zinc-500 text-center py-4">No skill gaps identified</p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {sorted.map((gap, i) => {
        const config = severityConfig[gap.severity] || severityConfig.low
        const Icon = config.icon
        const width = gap.severity === "high" ? 90 : gap.severity === "medium" ? 60 : 35

        return (
          <motion.div
            key={`${gap.skill}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "rounded-lg border p-3",
              config.bg,
              config.border
            )}
          >
            <div className="flex items-start gap-2.5">
              <Icon className={cn("size-4 mt-0.5 shrink-0", config.text)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-medium text-zinc-200 truncate">{gap.skill}</span>
                  <span className={cn("text-[10px] font-semibold uppercase tracking-wider", config.text)}>
                    {config.label}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", config.bar)}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
