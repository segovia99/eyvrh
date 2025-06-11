import Layout from "@/components/layout"
import QuickOptionButton from "@/components/quick-option-button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <Layout title="Opciones Rapidas">
      <div className="w-full flex justify-center">
        <Link href="/reportes" className="w-full max-w-[560px]">
          <QuickOptionButton>Crear Reporte</QuickOptionButton>
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <Link href="/planillas" className="w-full max-w-[560px]">
          <QuickOptionButton>Ver Planillas</QuickOptionButton>
        </Link>
      </div>

    </Layout>
  )
}
