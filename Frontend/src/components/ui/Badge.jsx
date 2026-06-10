import { cn } from "../../lib/cn"

const variants = {
  default: "bg-zinc-800 text-zinc-300 border-zinc-700",
  accent: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  required: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  danger: "bg-red-500/10 text-red-400 border-red-500/20",
}

export function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
