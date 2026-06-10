import { motion } from "framer-motion"
import { cn } from "../../lib/cn"

const variants = {
  primary: "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/20",
  secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
  ghost: "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60",
  danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
}

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm font-medium",
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  icon: Icon,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      {children}
    </motion.button>
  )
}
