import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function AgregarEmpleadoPage() {
  return (
    <Layout title="Agregar Empleado">
      <Card className="w-full max-w-[560px] bg-white">
        <CardHeader>
          <CardTitle className="text-teal-800">Información del Empleado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input id="nombre" placeholder="Ingrese nombre completo" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documento">Número de Documento</Label>
            <Input id="documento" placeholder="Ingrese número de documento" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="Ingrese correo electrónico" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" placeholder="Ingrese número de teléfono" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select>
              <SelectTrigger id="departamento">
                <SelectValue placeholder="Seleccione departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administracion">Administración</SelectItem>
                <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                <SelectItem value="ventas">Ventas</SelectItem>
                <SelectItem value="produccion">Producción</SelectItem>
                <SelectItem value="it">Tecnología</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo</Label>
            <Input id="cargo" placeholder="Ingrese cargo" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/empleados">Cancelar</Link>
          </Button>
          <Button className="bg-teal-800 hover:bg-teal-700">Guardar</Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}
