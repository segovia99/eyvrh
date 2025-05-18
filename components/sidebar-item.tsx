'use client'

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  action: () => void
  icon: ReactNode
  text: string
  active?: boolean
  className?: string
}

export default function SidebarItem({ action, icon, text, active, className }: SidebarItemProps) {
  return (
    <button
      onClick={action}
      className={cn(
        "flex items-center gap-4 px-8 py-4",
        active ? "text-white bg-teal-800" : "text-teal-800 hover:bg-teal-50",
        className,
      )}
    >
      {icon}
      <span className="text-xl">{text}</span>
    </button>
  )
}
