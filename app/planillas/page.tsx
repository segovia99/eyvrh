import Layout from "@/components/layout"
import QuickOptionButton from "@/components/quick-option-button"
import Link from "next/link"

export default function PlanillasPage() {
  return (
    <Layout title="Gestión de planillas">
      <div className="w-full flex justify-center">
        <Link href="/planillas/crear" className="w-full max-w-[560px]">
          <QuickOptionButton>Crear nueva planilla</QuickOptionButton>
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <Link href="/planillas/generadas" className="w-full max-w-[560px]">
          <QuickOptionButton>Planillas Generadas</QuickOptionButton>
        </Link>
      </div>
    </Layout>
  )
}
