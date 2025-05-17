import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, FileText } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ReporteEmpleadosPage() {
  return (
    <Layout title="Reporte de Empleados">
      <Card className="w-full max-w-[700px] bg-white">
        <CardHeader>
          <CardTitle className="text-teal-800">Configuración del Reporte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo-reporte">Tipo de Reporte</Label>
            <Select>
              <SelectTrigger id="tipo-reporte">
                <SelectValue placeholder="Seleccione tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">Listado General</SelectItem>
                <SelectItem value="departamento">Por Departamento</SelectItem>
                <SelectItem value="cargo">Por Cargo</SelectItem>
                <SelectItem value="antiguedad">Por Antigüedad</SelectItem>
                <SelectItem value="contrato">Por Tipo de Contrato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select>
              <SelectTrigger id="departamento">
                <SelectValue placeholder="Seleccione departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los departamentos</SelectItem>
                <SelectItem value="administracion">Administración</SelectItem>
                <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                <SelectItem value="ventas">Ventas</SelectItem>
                <SelectItem value="produccion">Producción</SelectItem>
                <SelectItem value="it">Tecnología</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha-inicio">Fecha Inicio</Label>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {true ? format(new Date(), "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fecha-fin">Fecha Fin</Label>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {true ? format(new Date(), "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Información a incluir</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="incluir-datos-personales" defaultChecked />
                <Label htmlFor="incluir-datos-personales">Datos personales</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="incluir-contacto" defaultChecked />
                <Label htmlFor="incluir-contacto">Información de contacto</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="incluir-cargo" defaultChecked />
                <Label htmlFor="incluir-cargo">Cargo y departamento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="incluir-salario" />
                <Label htmlFor="incluir-salario">Información salarial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="incluir-contrato" />
                <Label htmlFor="incluir-contrato">Datos de contrato</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="incluir-asistencia" />
                <Label htmlFor="incluir-asistencia">Registro de asistencia</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Formato de salida</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="formato-pdf" defaultChecked />
                <Label htmlFor="formato-pdf">PDF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="formato-excel" />
                <Label htmlFor="formato-excel">Excel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="formato-csv" />
                <Label htmlFor="formato-csv">CSV</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/reportes">Cancelar</Link>
          </Button>
          <Button className="bg-teal-800 hover:bg-teal-700">
            <FileText className="mr-2 h-4 w-4" />
            Generar Reporte
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}
