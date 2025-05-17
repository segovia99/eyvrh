import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText } from "lucide-react"
import Link from "next/link"

export default function EstadisticasPage() {
  return (
    <Layout title="Estadísticas y Análisis">
      <Card className="w-full max-w-[900px] bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-teal-800">Dashboard de Estadísticas</CardTitle>
            <p className="text-gray-500 mt-1">Periodo: Mayo 2025</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="mayo2025">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mayo2025">Mayo 2025</SelectItem>
                <SelectItem value="abril2025">Abril 2025</SelectItem>
                <SelectItem value="marzo2025">Marzo 2025</SelectItem>
                <SelectItem value="q22025">Q2 2025</SelectItem>
                <SelectItem value="q12025">Q1 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="empleados" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="empleados">Empleados</TabsTrigger>
              <TabsTrigger value="planillas">Planillas</TabsTrigger>
              <TabsTrigger value="financiero">Financiero</TabsTrigger>
            </TabsList>
            <TabsContent value="empleados" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">Total Empleados</p>
                  <p className="text-2xl font-bold text-teal-800">24</p>
                  <p className="text-xs text-teal-600">+2 desde el mes pasado</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">Nuevas Contrataciones</p>
                  <p className="text-2xl font-bold text-teal-800">3</p>
                  <p className="text-xs text-teal-600">+1 desde el mes pasado</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">Rotación</p>
                  <p className="text-2xl font-bold text-teal-800">4.2%</p>
                  <p className="text-xs text-teal-600">-1.3% desde el mes pasado</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-teal-800 mb-4">Distribución por Departamento</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Gráfico de distribución por departamento</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-teal-800 mb-4">Distribución por Cargo</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Gráfico de distribución por cargo</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-teal-800 mb-4">Tendencia de Contrataciones</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Gráfico de tendencia de contrataciones</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="planillas" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">Total Planillas</p>
                  <p className="text-2xl font-bold text-teal-800">5</p>
                  <p className="text-xs text-teal-600">Igual al mes pasado</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">Monto Total</p>
                  <p className="text-2xl font-bold text-teal-800">$45,678.90</p>
                  <p className="text-xs text-teal-600">+2.5% desde el mes pasado</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">Promedio por Empleado</p>
                  <p className="text-2xl font-bold text-teal-800">$1,903.29</p>
                  <p className="text-xs text-teal-600">+1.2% desde el mes pasado</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-teal-800 mb-4">Distribución por Tipo</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Gráfico de distribución por tipo de planilla</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-teal-800 mb-4">Distribución por Departamento</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Gráfico de distribución por departamento</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-teal-800 mb-4">Tendencia de Gastos</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Gráfico de tendencia de gastos</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="financiero" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">Gasto Total</p>
                  <p className="text-2xl font-bold text-teal-800">$45,678.90</p>
                  <p className="text-xs text-teal-600">+2.5% desde el mes pasado</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">Bonos y Comisiones</p>
                  <p className="text-2xl font-bold text-teal-800">$5,432.10</p>
                  <p className="text-xs text-teal-600">+8.3% desde el mes pasado</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">Deducciones</p>
                  <p className="text-2xl font-bold text-teal-800">$4,321.50</p>
                  <p className="text-xs text-teal-600">+1.7% desde el mes pasado</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-teal-800 mb-4">Distribución de Gastos</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Gráfico de distribución de gastos</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-teal-800 mb-4">Comparativo Mensual</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Gráfico comparativo mensual</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-teal-800 mb-4">Proyección Anual</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Gráfico de proyección anual</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button variant="outline" asChild>
              <Link href="/reportes">Volver a Reportes</Link>
            </Button>
            <Button className="bg-teal-800 hover:bg-teal-700">
              <FileText className="mr-2 h-4 w-4" />
              Generar Reporte Completo
            </Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}
