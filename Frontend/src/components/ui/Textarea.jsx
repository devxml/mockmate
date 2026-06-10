import { cn } from "../../lib/cn"

export function Textarea({ label, id, hint, maxLength, value, className, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 min-h-0">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-300">
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        className={cn(
          "w-full flex-1 min-h-[120px] rounded-lg border border-zinc-800 bg-zinc-900/80 px-3.5 py-3 text-sm text-zinc-100",
          "placeholder:text-zinc-600 outline-none resize-none transition-colors leading-relaxed",
          "focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20",
          className
        )}
        {...props}
      />
      {(hint || maxLength) && (
        <div className="flex justify-between text-xs text-zinc-600">
          {hint && <span>{hint}</span>}
          {maxLength && (
            <span className="ml-auto tabular-nums">
              {(value || "").length} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
