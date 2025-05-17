import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileSpreadsheet, Printer } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para la planilla
const planillaInfo = {
  id: 1,
  tipo: "Nómina",
  periodo: "Mayo 2025",
  fechaCreacion: "01/05/2025",
  fechaInicio: "01/05/2025",
  fechaFin: "31/05/2025",
  departamento: "Todos",
  estado: "Aprobada",
  descripcion: "Planilla de nómina correspondiente al mes de Mayo 2025",
  total: "$45,678.90",
}

// Datos de ejemplo para los empleados en la planilla
const empleadosPlanilla = [
  {
    id: 1,
    nombre: "Ana María López",
    documento: "12345678",
    cargo: "Gerente de RRHH",
    salarioBase: "$3,500.00",
    horasExtra: "$250.00",
    bonos: "$500.00",
    deducciones: "$425.00",
    total: "$3,825.00",
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    documento: "87654321",
    cargo: "Desarrollador Senior",
    salarioBase: "$2,800.00",
    horasExtra: "$0.00",
    bonos: "$300.00",
    deducciones: "$310.00",
    total: "$2,790.00",
  },
  {
    id: 3,
    nombre: "Sofía Martínez",
    documento: "23456789",
    cargo: "Ejecutiva de Ventas",
    salarioBase: "$2,200.00",
    horasExtra: "$0.00",
    bonos: "$1,200.00",
    deducciones: "$340.00",
    total: "$3,060.00",
  },
  {
    id: 4,
    nombre: "Javier Morales",
    documento: "98765432",
    cargo: "Contador",
    salarioBase: "$2,500.00",
    horasExtra: "$125.00",
    bonos: "$0.00",
    deducciones: "$262.50",
    total: "$2,362.50",
  },
  {
    id: 5,
    nombre: "Valentina Torres",
    documento: "34567890",
    cargo: "Supervisora",
    salarioBase: "$2,300.00",
    horasExtra: "$175.00",
    bonos: "$250.00",
    deducciones: "$272.50",
    total: "$2,452.50",
  },
]

export default function DetallePlanillaPage() {
  return (
    <Layout title="Detalle de Planilla">
      <Card className="w-full max-w-[900px] bg-white p-6">
        <CardHeader className="flex flex-row items-center justify-between p-0 pb-6">
          <div>
            <CardTitle className="text-2xl font-bold text-teal-800">
              {planillaInfo.tipo} - {planillaInfo.periodo}
            </CardTitle>
            <p className="text-gray-500 mt-1">Creada el {planillaInfo.fechaCreacion}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Descargar
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 pb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Periodo</p>
              <p>
                {planillaInfo.fechaInicio} - {planillaInfo.fechaFin}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Departamento</p>
              <p>{planillaInfo.departamento}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Estado</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  planillaInfo.estado === "Aprobada"
                    ? "bg-green-100 text-green-800"
                    : planillaInfo.estado === "Pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {planillaInfo.estado}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="font-bold">{planillaInfo.total}</p>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <p className="text-sm font-medium text-gray-500">Descripción</p>
            <p>{planillaInfo.descripcion}</p>
          </div>

          <h3 className="text-lg font-medium text-teal-800 mb-4">Detalle de Empleados</h3>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Salario Base</TableHead>
                  <TableHead>Horas Extra</TableHead>
                  <TableHead>Bonos</TableHead>
                  <TableHead>Deducciones</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empleadosPlanilla.map((empleado) => (
                  <TableRow key={empleado.id}>
                    <TableCell className="font-medium">{empleado.nombre}</TableCell>
                    <TableCell>{empleado.cargo}</TableCell>
                    <TableCell>{empleado.salarioBase}</TableCell>
                    <TableCell>{empleado.horasExtra}</TableCell>
                    <TableCell>{empleado.bonos}</TableCell>
                    <TableCell>{empleado.deducciones}</TableCell>
                    <TableCell className="text-right font-medium">{empleado.total}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={6} className="text-right font-bold">
                    Total Planilla
                  </TableCell>
                  <TableCell className="text-right font-bold">{planillaInfo.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-0">
          <Button variant="outline" asChild>
            <Link href="/planillas/generadas">Volver a Planillas</Link>
          </Button>
          <Button className="bg-teal-800 hover:bg-teal-700">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar a Excel
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}
