import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { Card } from "../../../components/ui/Card"
import { cn } from "../../../lib/cn"

function getScoreColor(score) {
  if (score >= 80) return "text-emerald-400"
  if (score >= 60) return "text-amber-400"
  return "text-red-400"
}

export function ReportCard({ report, onClick, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        hover
        onClick={onClick}
        className="p-4 cursor-pointer group transition-all hover:bg-zinc-900/60"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-zinc-200 truncate group-hover:text-violet-300 transition-colors">
              {report.title || "Untitled Position"}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-zinc-500">
              <Calendar className="size-3" />
              {new Date(report.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("text-lg font-bold tabular-nums", getScoreColor(report.matchScore))}>
              {report.matchScore}%
            </span>
            <ArrowRight className="size-4 text-zinc-600 group-hover:text-violet-400 transition-colors" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
