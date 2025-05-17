import { Home, Users, FileText, FileSpreadsheet, LogOut } from "lucide-react"
import ActiveLink from "./active-link"
import SidebarItem from "./sidebar-item"

export default function Sidebar() {
  return (
    <div className="w-[337px] flex flex-col bg-white h-full">
      {/* Logo */}
      <div className="p-8">
        <h1 className="text-4xl font-light tracking-wider text-teal-800">E Y V</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ActiveLink href="/" icon={<Home className="w-6 h-6" />} text="Inicio" />
        <ActiveLink href="/empleados" icon={<Users className="w-6 h-6" />} text="Empleados" />
        <ActiveLink href="/planillas" icon={<FileSpreadsheet className="w-6 h-6" />} text="Planillas" />
        <ActiveLink href="/reportes" icon={<FileText className="w-6 h-6" />} text="Reportes" />
      </nav>

      {/* Divider */}
      <div className="mx-6 my-4 border-t border-teal-700 opacity-30"></div>

      {/* Logout */}
      <SidebarItem href="/logout" icon={<LogOut className="w-6 h-6" />} text="Salir" className="mb-6" />
    </div>
  )
}
