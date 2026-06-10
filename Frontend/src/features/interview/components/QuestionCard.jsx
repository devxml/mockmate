import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "../../../lib/cn"

export function QuestionCard({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden transition-colors hover:border-zinc-700">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <span className="shrink-0 mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
          Q{index + 1}
        </span>
        <p className="flex-1 text-sm font-medium text-zinc-200 leading-relaxed">{item.question}</p>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 mt-1 text-zinc-500 transition-transform duration-200",
            open && "rotate-180 text-violet-400"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 space-y-3 border-t border-zinc-800/80 mx-4">
              <div className="pt-3">
                <span className="inline-block mb-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Intention
                </span>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.intention}</p>
              </div>
              <div>
                <span className="inline-block mb-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Model Answer
                </span>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
