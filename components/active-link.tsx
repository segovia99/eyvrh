"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ActiveLinkProps {
  href: string
  icon: ReactNode
  text: string
  className?: string
}

export default function ActiveLink({ href, icon, text, className }: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        "ml-1 relative flex items-center gap-4 px-8 py-4 overflow-hidden",
        isActive ? "text-white bg-teal-800 rounded-l-full" : "text-teal-800 hover:bg-teal-50",
        className,
      )}
    >
      {icon}
      <span className="text-xl">{text}</span>
    </Link>
  )
}
