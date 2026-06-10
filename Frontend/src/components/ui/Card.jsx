import { motion } from "framer-motion"
import { cn } from "../../lib/cn"

export function Card({ children, className, hover = false, ...props }) {
  const Component = hover ? motion.div : "div"
  const motionProps = hover
    ? {
        whileHover: { borderColor: "rgba(139, 92, 246, 0.3)" },
        transition: { duration: 0.2 },
      }
    : {}

  return (
    <Component
      className={cn(
        "rounded-xl border border-zinc-800 bg-surface-overlay/50 backdrop-blur-sm",
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn("flex items-center justify-between px-5 py-4 border-b border-zinc-800/80", className)}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }) {
  return <div className={cn("p-5", className)}>{children}</div>
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn("flex items-center justify-between px-5 py-4 border-t border-zinc-800/80", className)}>
      {children}
    </div>
  )
}
