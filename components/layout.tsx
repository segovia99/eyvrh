import type React from "react"
import Sidebar from "./sidebar"

interface LayoutProps {
  children: React.ReactNode
  title: string
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-teal-800">
        {/* Header */}
        <header className="p-12">
          <h1 className="text-4xl font-normal text-white">{title}</h1>
        </header>

        {/* Content */}
        <div className="flex flex-col items-center gap-8 px-12 w-full max-w-[900px] mx-auto">{children}</div>
      </div>
    </div>
  )
}
