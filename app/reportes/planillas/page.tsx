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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportePlanillasPage() {
  return (
    <Layout title="Reporte de Planillas">
      <Card className="w-full max-w-[700px] bg-white">
        <CardHeader>
          <CardTitle className="text-teal-800">Configuración del Reporte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">Reporte General</TabsTrigger>
              <TabsTrigger value="estadistico">Reporte Estadístico</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="tipo-planilla">Tipo de Planilla</Label>
                <Select>
                  <SelectTrigger id="tipo-planilla">
                    <SelectValue placeholder="Seleccione tipo de planilla" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las planillas</SelectItem>
                    <SelectItem value="nomina">Nómina</SelectItem>
                    <SelectItem value="aguinaldo">Aguinaldo</SelectItem>
                    <SelectItem value="vacaciones">Vacaciones</SelectItem>
                    <SelectItem value="bonificaciones">Bonificaciones</SelectItem>
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
                    <Checkbox id="incluir-detalles-empleados" defaultChecked />
                    <Label htmlFor="incluir-detalles-empleados">Detalles por empleado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="incluir-bonos" defaultChecked />
                    <Label htmlFor="incluir-bonos">Bonos y comisiones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="incluir-deducciones" defaultChecked />
                    <Label htmlFor="incluir-deducciones">Deducciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="incluir-horas-extra" />
                    <Label htmlFor="incluir-horas-extra">Horas extra</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="incluir-totales" defaultChecked />
                    <Label htmlFor="incluir-totales">Totales y subtotales</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="estadistico" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="periodo">Periodo</Label>
                <Select>
                  <SelectTrigger id="periodo">
                    <SelectValue placeholder="Seleccione periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mensual">Mensual</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                    <SelectItem value="semestral">Semestral</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                    <SelectItem value="personalizado">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo-grafico">Tipo de Gráfico</Label>
                <Select>
                  <SelectTrigger id="tipo-grafico">
                    <SelectValue placeholder="Seleccione tipo de gráfico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barras">Barras</SelectItem>
                    <SelectItem value="lineas">Líneas</SelectItem>
                    <SelectItem value="pastel">Pastel</SelectItem>
                    <SelectItem value="area">Área</SelectItem>
                    <SelectItem value="combinado">Combinado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Métricas a incluir</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="metrica-total-planilla" defaultChecked />
                    <Label htmlFor="metrica-total-planilla">Total de planilla</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="metrica-promedio-salario" defaultChecked />
                    <Label htmlFor="metrica-promedio-salario">Promedio de salarios</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="metrica-distribucion-departamento" defaultChecked />
                    <Label htmlFor="metrica-distribucion-departamento">Distribución por departamento</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="metrica-bonos" />
                    <Label htmlFor="metrica-bonos">Bonos y comisiones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="metrica-deducciones" />
                    <Label htmlFor="metrica-deducciones">Deducciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="metrica-tendencia" />
                    <Label htmlFor="metrica-tendencia">Tendencia temporal</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Opciones adicionales</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="incluir-tabla-datos" defaultChecked />
                  <Label htmlFor="incluir-tabla-datos">Incluir tabla de datos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="incluir-comparativo" />
                  <Label htmlFor="incluir-comparativo">Incluir comparativo con periodo anterior</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

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
