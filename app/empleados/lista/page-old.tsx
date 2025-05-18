import Layout from "@/components/layout"
import QuickOptionButton from "@/components/quick-option-button"
import Link from "next/link"

export default function EmpleadosPage() {
  return (
    <Layout title="Empleados">
      <div className="w-full flex justify-center">
        <Link href="/empleados/agregar" className="w-full max-w-[560px]">
          <QuickOptionButton>Agregar</QuickOptionButton>
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <Link href="/empleados/modificar" className="w-full max-w-[560px]">
          <QuickOptionButton>Modificar</QuickOptionButton>
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <Link href="/empleados/eliminar" className="w-full max-w-[560px]">
          <QuickOptionButton>Eliminar</QuickOptionButton>
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <Link href="/empleados/lista" className="w-full max-w-[560px]">
          <QuickOptionButton>Ver lista de empleados</QuickOptionButton>
        </Link>
      </div>
    </Layout>
  )
}
