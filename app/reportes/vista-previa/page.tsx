import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Printer } from "lucide-react"
import Link from "next/link"

export default function VistaPrevia() {
  return (
    <Layout title="Vista Previa del Reporte">
      <Card className="w-full max-w-[900px] bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-teal-800">Reporte de Empleados</h2>
            <p className="text-gray-500 mt-1">Generado el 16/05/2025</p>
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
            <Button className="bg-teal-800 hover:bg-teal-700" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-teal-800 mb-2">Parámetros del Reporte</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Tipo de Reporte:</span> Listado General
            </div>
            <div>
              <span className="font-medium">Departamento:</span> Todos
            </div>
            <div>
              <span className="font-medium">Periodo:</span> 01/01/2025 - 16/05/2025
            </div>
            <div>
              <span className="font-medium">Información incluida:</span> Datos personales, Contacto, Cargo
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-teal-800 mb-4">Resumen</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-teal-800">Total Empleados</p>
              <p className="text-2xl font-bold text-teal-800">24</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-teal-800">Departamentos</p>
              <p className="text-2xl font-bold text-teal-800">5</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-teal-800">Cargos</p>
              <p className="text-2xl font-bold text-teal-800">12</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-teal-800 mb-4">Detalle de Empleados</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Ana María López</TableCell>
                  <TableCell>12345678</TableCell>
                  <TableCell>Recursos Humanos</TableCell>
                  <TableCell>Gerente de RRHH</TableCell>
                  <TableCell>ana.lopez@eyv.com</TableCell>
                  <TableCell>555-1234</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Carlos Rodríguez</TableCell>
                  <TableCell>87654321</TableCell>
                  <TableCell>Tecnología</TableCell>
                  <TableCell>Desarrollador Senior</TableCell>
                  <TableCell>carlos.rodriguez@eyv.com</TableCell>
                  <TableCell>555-5678</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sofía Martínez</TableCell>
                  <TableCell>23456789</TableCell>
                  <TableCell>Ventas</TableCell>
                  <TableCell>Ejecutiva de Ventas</TableCell>
                  <TableCell>sofia.martinez@eyv.com</TableCell>
                  <TableCell>555-9012</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Javier Morales</TableCell>
                  <TableCell>98765432</TableCell>
                  <TableCell>Administración</TableCell>
                  <TableCell>Contador</TableCell>
                  <TableCell>javier.morales@eyv.com</TableCell>
                  <TableCell>555-3456</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Valentina Torres</TableCell>
                  <TableCell>34567890</TableCell>
                  <TableCell>Producción</TableCell>
                  <TableCell>Supervisora</TableCell>
                  <TableCell>valentina.torres@eyv.com</TableCell>
                  <TableCell>555-7890</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="text-sm text-gray-500 mt-2">Mostrando 5 de 24 empleados</div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-teal-800 mb-4">Distribución por Departamento</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Gráfico de distribución por departamento</p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link href="/reportes">Volver a Reportes</Link>
          </Button>
          <Button className="bg-teal-800 hover:bg-teal-700">
            <FileText className="mr-2 h-4 w-4" />
            Generar Nuevo Reporte
          </Button>
        </div>
      </Card>
    </Layout>
  )
}
