import { motion } from "framer-motion"

export function RoadmapDay({ day, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="relative pl-10 pb-8 last:pb-0"
    >
      <div className="absolute left-[11px] top-2 bottom-0 w-px bg-gradient-to-b from-violet-500/50 to-transparent last:hidden" />
      <div className="absolute left-0 top-1.5 size-6 rounded-full border-2 border-violet-500 bg-surface flex items-center justify-center">
        <div className="size-2 rounded-full bg-violet-500" />
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
            Day {day.day}
          </span>
          <h3 className="text-sm font-semibold text-zinc-200">{day.focus}</h3>
        </div>
        <ul className="space-y-2">
          {day.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
              <span className="mt-2 size-1 rounded-full bg-zinc-600 shrink-0" />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
