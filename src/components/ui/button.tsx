import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link"
type ButtonSize = "sm" | "md" | "lg" | "icon"

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors transition-transform disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"

function variantClasses(variant: ButtonVariant = "primary") {
  switch (variant) {
    case "secondary":
      return "bg-slate-800 text-slate-100 hover:bg-slate-700"
    case "outline":
      return "border border-slate-600 bg-slate-900/60 text-slate-100 hover:border-sky-400 hover:text-sky-100"
    case "ghost":
      return "bg-transparent text-slate-100 hover:bg-slate-900/60"
    case "link":
      return "rounded-none px-0 py-0 text-sky-300 hover:text-sky-100 hover:underline"
    case "primary":
    default:
      return "bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/40 hover:bg-sky-400 hover:-translate-y-0.5"
  }
}

function sizeClasses(size: ButtonSize = "md") {
  switch (size) {
    case "sm":
      return "h-8 px-3 text-xs"
    case "lg":
      return "h-11 px-6 text-sm"
    case "icon":
      return "h-9 w-9 p-0"
    case "md":
    default:
      return "h-9 px-4 text-sm"
  }
}

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

function Button({ className, variant = "primary", size = "md", asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(baseClasses, variantClasses(variant), sizeClasses(size), className)}
      {...props}
    />
  )
}

export { Button }
