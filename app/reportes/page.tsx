import Layout from "@/components/layout"
import QuickOptionButton from "@/components/quick-option-button"
import Link from "next/link"

export default function ReportesPage() {
  return (
    <Layout title="Reportes">
      <div className="w-full flex justify-center">
        <Link href="/reportes/empleados" className="w-full max-w-[560px]">
          <QuickOptionButton>Reporte de empleados</QuickOptionButton>
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <Link href="/reportes/planillas" className="w-full max-w-[560px]">
          <QuickOptionButton>Reporte de planillas</QuickOptionButton>
        </Link>
      </div>
    </Layout>
  )
}
