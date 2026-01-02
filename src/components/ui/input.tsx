import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-xl border border-slate-800/80 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 shadow-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-40 placeholder:text-slate-500",
        "focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/60",
        className
      )}
      {...props}
    />
  )
}

export { Input }
