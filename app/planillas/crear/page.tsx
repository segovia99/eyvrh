import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function CrearPlanillaPage() {
  return (
    <Layout title="Crear Nueva Planilla">
      <Card className="w-full max-w-[700px] bg-white">
        <CardHeader>
          <CardTitle className="text-teal-800">Información de la Planilla</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Planilla</Label>
            <Select>
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Seleccione tipo de planilla" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nomina">Nómina</SelectItem>
                <SelectItem value="aguinaldo">Aguinaldo</SelectItem>
                <SelectItem value="vacaciones">Vacaciones</SelectItem>
                <SelectItem value="bonificaciones">Bonificaciones</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input id="descripcion" placeholder="Ingrese una descripción para la planilla" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="incluir-bonos" />
            <Label htmlFor="incluir-bonos">Incluir bonos y comisiones</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="incluir-deducciones" />
            <Label htmlFor="incluir-deducciones">Incluir deducciones</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/planillas">Cancelar</Link>
          </Button>
          <Button className="bg-teal-800 hover:bg-teal-700">Generar Planilla</Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}
