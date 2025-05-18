import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getUsers } from "@/lib/api"
import { Empleado } from "@/types/empleados"
import { Edit, Trash2, UserPlus } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para la tabla
// const empleados = [
//   {
//     id: 1,
//     nombre: "Ana María López",
//     documento: "12345678",
//     departamento: "Recursos Humanos",
//     cargo: "Gerente de RRHH",
//     email: "ana.lopez@eyv.com",
//     telefono: "555-1234",
//   },
//   {
//     id: 2,
//     nombre: "Carlos Rodríguez",
//     documento: "87654321",
//     departamento: "Tecnología",
//     cargo: "Desarrollador Senior",
//     email: "carlos.rodriguez@eyv.com",
//     telefono: "555-5678",
//   },
//   {
//     id: 3,
//     nombre: "Sofía Martínez",
//     documento: "23456789",
//     departamento: "Ventas",
//     cargo: "Ejecutiva de Ventas",
//     email: "sofia.martinez@eyv.com",
//     telefono: "555-9012",
//   },
//   {
//     id: 4,
//     nombre: "Javier Morales",
//     documento: "98765432",
//     departamento: "Administración",
//     cargo: "Contador",
//     email: "javier.morales@eyv.com",
//     telefono: "555-3456",
//   },
//   {
//     id: 5,
//     nombre: "Valentina Torres",
//     documento: "34567890",
//     departamento: "Producción",
//     cargo: "Supervisora",
//     email: "valentina.torres@eyv.com",
//     telefono: "555-7890",
//   },
// ]

export default async function ListaEmpleadosPage() {
  const empleados:Empleado[] = await getUsers();
  return (
    <Layout title="Lista de Empleados">
      <Card className="w-full max-w-[1080px] bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-teal-800">Empleados Registrados</h2>
          <Button className="bg-teal-800 hover:bg-teal-700" asChild>
            <Link href="/empleados/agregar">
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Empleado
            </Link>
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>DUI</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empleados.map((empleado) => (
                <TableRow key={empleado.id}>
                  <TableCell className="font-medium">{empleado.nombre}</TableCell>
                  <TableCell>{empleado.dui}</TableCell>
                  <TableCell>{empleado.email}</TableCell>
                  <TableCell>{empleado.cargo}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </Layout>
  )
}
