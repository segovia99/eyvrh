import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface QuickOptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function QuickOptionButton({ children, className, ...props }: QuickOptionButtonProps) {
  return (
    <button
      className={cn(
        "w-full max-w-[560px] py-6 text-xl font-medium text-teal-800 bg-white rounded-full hover:bg-gray-100 transition mx-auto",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
