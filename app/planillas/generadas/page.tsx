import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye, FileSpreadsheet, Printer, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Datos de ejemplo para la tabla
const planillas = [
  {
    id: 1,
    tipo: "Nómina",
    periodo: "Mayo 2025",
    fechaCreacion: "01/05/2025",
    departamento: "Todos",
    estado: "Aprobada",
    total: "$45,678.90",
  },
  {
    id: 2,
    tipo: "Aguinaldo",
    periodo: "Diciembre 2024",
    fechaCreacion: "15/12/2024",
    departamento: "Todos",
    estado: "Aprobada",
    total: "$78,123.45",
  },
  {
    id: 3,
    tipo: "Bonificaciones",
    periodo: "Abril 2025",
    fechaCreacion: "25/04/2025",
    departamento: "Ventas",
    estado: "Pendiente",
    total: "$12,345.67",
  },
  {
    id: 4,
    tipo: "Nómina",
    periodo: "Abril 2025",
    fechaCreacion: "01/04/2025",
    departamento: "Todos",
    estado: "Aprobada",
    total: "$44,567.89",
  },
  {
    id: 5,
    tipo: "Vacaciones",
    periodo: "Marzo 2025",
    fechaCreacion: "15/03/2025",
    departamento: "Producción",
    estado: "Aprobada",
    total: "$8,765.43",
  },
]

export default function PlanillasGeneradasPage() {
  return (
    <Layout title="Planillas Generadas">
      <Card className="w-full max-w-[900px] bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-teal-800">Historial de Planillas</h2>
          <Button className="bg-teal-800 hover:bg-teal-700" asChild>
            <Link href="/planillas/crear">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Nueva Planilla
            </Link>
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Buscar planilla..." className="pl-8" />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="nomina">Nómina</SelectItem>
              <SelectItem value="aguinaldo">Aguinaldo</SelectItem>
              <SelectItem value="vacaciones">Vacaciones</SelectItem>
              <SelectItem value="bonificaciones">Bonificaciones</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="aprobada">Aprobada</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="rechazada">Rechazada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planillas.map((planilla) => (
                <TableRow key={planilla.id}>
                  <TableCell className="font-medium">{planilla.tipo}</TableCell>
                  <TableCell>{planilla.periodo}</TableCell>
                  <TableCell>{planilla.fechaCreacion}</TableCell>
                  <TableCell>{planilla.departamento}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        planilla.estado === "Aprobada"
                          ? "bg-green-100 text-green-800"
                          : planilla.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {planilla.estado}
                    </span>
                  </TableCell>
                  <TableCell>{planilla.total}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" title="Ver">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8" title="Descargar">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8" title="Imprimir">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">Mostrando 5 de 24 planillas</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="bg-teal-50">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </div>
      </Card>
    </Layout>
  )
}
