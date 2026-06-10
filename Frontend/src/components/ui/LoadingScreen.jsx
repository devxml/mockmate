import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-surface">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div className="size-12 rounded-full border-2 border-zinc-800 border-t-violet-500" />
        <Sparkles className="absolute inset-0 m-auto size-5 text-violet-400" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-zinc-400"
      >
        {message}
      </motion.p>
    </div>
  )
}
