import { motion } from "framer-motion"
import { cn } from "../../lib/cn"

function getScoreMeta(score) {
  if (score >= 80) return { label: "Strong match", color: "text-emerald-400", stroke: "#34d399" }
  if (score >= 60) return { label: "Good potential", color: "text-amber-400", stroke: "#fbbf24" }
  return { label: "Needs work", color: "text-red-400", stroke: "#f87171" }
}

export function ProgressRing({ score, size = 120, strokeWidth = 8, className }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const meta = getScoreMeta(score)

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#27272a"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={meta.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold tabular-nums text-zinc-100"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-zinc-500 font-medium">%</span>
        </div>
      </div>
      <p className={cn("text-sm font-medium", meta.color)}>{meta.label}</p>
    </div>
  )
}
