"use client"

import { useState, useMemo, useEffect } from "react"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Building,
  Download,
  BarChart3,
  PieChart,
  Clock,
  Shield,
} from "lucide-react"
import { PlanillaEmpleado } from "@/types/empleados"
import { toast } from "sonner"
import { getPlanillasPorMesAnio } from "@/lib/api"


// Extend PlanillaEmpleado to include all possible properties with proper types
type PlanillaCompleta = Omit<PlanillaEmpleado, 'descuetoAfp' | 'horasExtras' | 'horasENocturnas' | 'horasExtrasDoble' | 'horasExtrasDobleFestivo' | 'horasExtrasTriple' | 'horasExtrasTripleFestivo'> & {
  // Fixed properties
  descuentoAfp: number; 
  descuentoIsss: number;
  descuentoRenta: number;
  diasLaborados: number;
  horasAusentes: number;
  vacaciones: number;
  incapacidades: number;
  asuetos: number;
  cargoEmpleado: string;
  nombreEmpleado: string;
  salario: number;
  salarioLiquido: number;
  horasExtras: number;
  horasENocturnas: number;
  horasExtrasDoble: number;
  horasExtrasDobleFestivo: number;
  horasExtrasTriple: number;
  horasExtrasTripleFestivo: number;
  duiEmpleado: string;
  id: number;
  mes: string;
  anio: string;
};

export default function ReportesDashboard() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<string>("todos");
  const [planillasData, setPlanillasData] = useState<PlanillaCompleta[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Define types for grouped data
  interface GrupoCargo {
    cargo: string;
    empleados: Set<string>;
    totalSalarios: number;
    totalLiquido: number;
    totalDescuentos: number;
  }
  
  interface MesData {
    periodo: string;
    empleados: Set<string>;
    totalSalarios: number;
    totalLiquido: number;
    totalDescuentos: number;
  }

  const cargarPlanillas = async (mes?: string, anio?: string): Promise<void> => {
    // Default to current month and year if not provided
    const targetMes = mes || (new Date().getMonth() + 1).toString().padStart(2, '0');
    const targetAnio = anio || new Date().getFullYear().toString();
    
    try {
      setIsLoading(true);
      setError(null);
      
      const rawData = await getPlanillasPorMesAnio(targetMes, targetAnio);
      
      if (!rawData || !Array.isArray(rawData)) {
        throw new Error('Formato de datos inválido');
      }

      // Transform and ensure all required fields have default values
      const data = rawData.map(item => {
        // Handle the typo in the API response (descuetoAfp vs descuentoAfp)
        const descuentoAfp = 'descuentoAfp' in item ? item.descuentoAfp : 
                             'descuetoAfp' in item ? (item as any).descuetoAfp : 0;
        
        // Create a new object with all required properties
        const processedItem: PlanillaCompleta = {
          ...item,
          // Required fields with defaults
          id: item.id || 0,
          mes: item.mes || targetMes,
          anio: item.anio || targetAnio,
          
          // Financial fields
          descuentoAfp: Number(descuentoAfp) || 0,
          descuentoIsss: Number(item.descuentoIsss) || 0,
          descuentoRenta: Number(item.descuentoRenta) || 0,
          salario: Number(item.salario) || 0,
          salarioLiquido: Number(item.salarioLiquido) || 0,
          
          // Time-related fields
          diasLaborados: Number(item.diasLaborados) || 0,
          horasAusentes: Number(item.horasAusentes) || 0,
          vacaciones: Number(item.vacaciones) || 0,
          incapacidades: Number(item.incapacidades) || 0,
          asuetos: Number(item.asuetos) || 0,
          
          // Overtime fields
          horasExtras: Number(item.horasExtras) || 0,
          horasENocturnas: Number(item.horasENocturnas) || 0,
          horasExtrasDoble: Number(item.horasExtrasDoble) || 0,
          horasExtrasDobleFestivo: Number(item.horasExtrasDobleFestivo) || 0,
          horasExtrasTriple: Number(item.horasExtrasTriple) || 0,
          horasExtrasTripleFestivo: Number(item.horasExtrasTripleFestivo) || 0,
          
          // Employee info
          cargoEmpleado: String(item.cargoEmpleado || 'Sin cargo'),
          nombreEmpleado: String(item.nombreEmpleado || 'Sin nombre'),
          duiEmpleado: String(item.duiEmpleado || '')
        };
        
        // Ensure we don't include the typo version in the final object
        if ('descuetoAfp' in processedItem) {
          delete (processedItem as any).descuetoAfp;
        }
        
        return processedItem;
      });
      
      setPlanillasData(data);
    } catch (err) {
      console.error("Error al cargar planillas:", err);
      setError("Error al cargar los datos de planillas");
      toast.error("No se pudieron cargar los datos de planillas");
      setPlanillasData([]); // Reset to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount or when period changes
  useEffect(() => {
    cargarPlanillas();
  }, []);

 

  // Obtener periodos disponibles
  const periodosDisponibles = useMemo<string[]>(() => {
    const periodos = new Set<string>();
    
    // Add current month and previous 5 months for better UX
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                         'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      const monthName = monthNames[date.getMonth()];
      const year = date.getFullYear();
      periodos.add(`${monthName}-${year}`);
    }
    
    // Also add any months from the data that might not be in the last 6 months
    planillasData.forEach((planilla) => {
      const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                         'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      const monthName = monthNames[parseInt(planilla.mes) - 1] || '';
      periodos.add(`${monthName}-${planilla.anio}`);
    });
    
    return ["todos", ...Array.from(periodos).sort().reverse()];
  }, [planillasData])

  // Filtrar datos por periodo
  const datosFiltrados = useMemo<PlanillaCompleta[]>(() => {
    if (periodoSeleccionado === "todos") return planillasData;
    if (isLoading || !planillasData.length) return [];
    
    const [mesNombre, anio] = periodoSeleccionado.split("-");
    const monthMap: Record<string, string> = {
      'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
      'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
      'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
    };
    
    const mesNumero = monthMap[mesNombre.toLowerCase()] || '';
    
    return planillasData.filter((planilla: PlanillaEmpleado) => {
      return planilla.mes === mesNumero && planilla.anio === anio;
    });
  }, [periodoSeleccionado, planillasData, isLoading]);

  // Método para formatear números como moneda
  const formatCurrency = (value: number | undefined | null): string => {
    if (value === null) return '$0.00';
    if (value === undefined) return '$0.00';
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Definir tipo para las métricas
  type Metricas = {
    empleadosUnicos: number;
    totalSalarios: number;
    totalDescuentos: number;
    totalLiquido: number;
    totalIncapacidades: number;
    totalVacaciones: number;
    totalHorasExtras: number;
    promedioSalario: number;
    porcentajeDescuentos: number;
  };

  // Calcular métricas generales
  const metricas = useMemo<Metricas>(() => {
    if (isLoading || !datosFiltrados.length) {
      return {
        empleadosUnicos: 0,
        totalSalarios: 0,
        totalDescuentos: 0,
        totalLiquido: 0,
        totalIncapacidades: 0,
        totalVacaciones: 0,
        totalHorasExtras: 0,
        promedioSalario: 0,
        porcentajeDescuentos: 0,
      };
    }
    
    const empleadosUnicos = new Set(datosFiltrados.map((p) => p.duiEmpleado)).size;
    const totalSalarios = datosFiltrados.reduce((sum, p) => sum + (p.salarioBase || 0), 0);
    const totalDescuentos = datosFiltrados.reduce((sum, p) => sum + (p.totalDescuentos || 0), 0);
    const totalLiquido = datosFiltrados.reduce((sum, p) => sum + (p.liquidoPagar || 0), 0);
    const totalIncapacidades = datosFiltrados.reduce((sum, p) => sum + (p.incapacidades || 0), 0);
    const totalVacaciones = datosFiltrados.reduce((sum, p) => sum + (p.vacaciones || 0), 0);
    const totalHorasExtras = datosFiltrados.reduce(
      (sum, p) => sum + (p.horasEDiurnas || 0) + (p.horasENocturnas || 0), 
      0
    );

    return {
      empleadosUnicos,
      totalSalarios,
      totalDescuentos,
      totalLiquido,
      totalIncapacidades,
      totalVacaciones,
      totalHorasExtras,
      promedioSalario: empleadosUnicos > 0 ? totalSalarios / empleadosUnicos : 0,
      porcentajeDescuentos: totalSalarios > 0 ? (totalDescuentos / totalSalarios) * 100 : 0,
    }
  }, [datosFiltrados])

  // Agrupar por cargo
  type DatosPorCargo = {
    cargo: string;
    empleados: number;
    totalSalarios: number;
    totalLiquido: number;
    totalDescuentos: number;
    promedioSalario: number;
  };



  const datosPorCargo = useMemo<DatosPorCargo[]>(() => {
    if (isLoading || !datosFiltrados.length) return [];
    
    const grupos: Record<string, GrupoCargo> = {};
    
    datosFiltrados.forEach((planilla) => {
      if (!planilla.cargoEmpleado) return; // Skip if no cargo
      
      if (!grupos[planilla.cargoEmpleado]) {
        grupos[planilla.cargoEmpleado] = {
          cargo: planilla.cargoEmpleado,
          empleados: new Set(),
          totalSalarios: 0,
          totalLiquido: 0,
          totalDescuentos: 0,
        };
      }
      
      const grupo = grupos[planilla.cargoEmpleado];
      if (grupo) {
        grupo.empleados.add(planilla.duiEmpleado);
        grupo.totalSalarios += planilla.salarioBase || 0;
        grupo.totalLiquido += planilla.liquidoPagar || 0;
        grupo.totalDescuentos += planilla.totalDescuentos || 0;
      }
    });

    return Object.values(grupos).map((grupo) => ({
      ...grupo,
      empleados: grupo.empleados.size,
      promedioSalario: grupo.empleados.size > 0 ? grupo.totalSalarios / grupo.empleados.size : 0,
    }));
  }, [datosFiltrados, isLoading])

  // Datos por mes para tendencias
  type TendenciasMensuales = {
    periodo: string;
    empleados: number;
    totalSalarios: number;
    totalLiquido: number;
    totalDescuentos: number;
  };

  const tendenciasMensuales = useMemo<TendenciasMensuales[]>(() => {
    if (isLoading || !planillasData.length) return [];
    
    const meses: Record<string, MesData> = {};
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                       'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    planillasData.forEach((planilla) => {
      const monthIndex = parseInt(planilla.mes) - 1;
      const monthName = monthNames[monthIndex] || '';
      const clave = `${monthName}-${planilla.anio}`;
      
      if (!meses[clave]) {
        meses[clave] = {
          periodo: clave,
          empleados: new Set(),
          totalSalarios: 0,
          totalLiquido: 0,
          totalDescuentos: 0,
        };
      }
      
      meses[clave].empleados.add(planilla.duiEmpleado);
      meses[clave].totalSalarios += planilla.salarioBase || 0;
      meses[clave].totalLiquido += planilla.liquidoPagar || 0;
      meses[clave].totalDescuentos += planilla.totalDescuentos || 0;
    });

    return Object.values(meses)
      .map((mes) => ({
        ...mes,
        empleados: mes.empleados.size,
      }))
      .sort((a, b) => a.periodo.localeCompare(b.periodo));
  }, [planillasData, isLoading]);

  return (
    <Layout title="Dashboard de Reportes">
      <div className="w-full max-w-[1400px] space-y-6">
        {/* Header con filtros */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-teal-800">Dashboard de Reportes</CardTitle>
              {/* <p className="text-gray-500 mt-1">Análisis completo de planillas y nómina</p> */}
            </div>
            <div className="flex gap-4 items-center">
              <Select value={periodoSeleccionado} onValueChange={setPeriodoSeleccionado}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Seleccionar periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los periodos</SelectItem>
                  {periodosDisponibles.slice(1).map((periodo) => (
                    <SelectItem key={periodo} value={periodo}>
                      {periodo.charAt(0).toUpperCase() + periodo.slice(1).replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar Dashboard
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Empleados</p>
                  <p className="text-3xl font-bold text-teal-800">{metricas.empleadosUnicos}</p>
                  <p className="text-xs text-gray-500 mt-1">Empleados únicos procesados</p>
                </div>
                <Users className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Salarios</p>
                  <p className="text-3xl font-bold text-teal-800">${metricas.totalSalarios.toFixed(0)}</p>
                  <p className="text-xs text-gray-500 mt-1">Salarios base totales</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Descuentos</p>
                  <p className="text-3xl font-bold text-teal-800">${metricas.totalDescuentos.toFixed(0)}</p>
                  <p className="text-xs text-gray-500 mt-1">{metricas.porcentajeDescuentos.toFixed(1)}% del salario</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Líquido a Pagar</p>
                  <p className="text-3xl font-bold text-teal-800">${metricas.totalLiquido.toFixed(0)}</p>
                  <p className="text-xs text-gray-500 mt-1">Monto neto total</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para diferentes reportes */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="empleados">Empleados</TabsTrigger>
            <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
            <TabsTrigger value="departamentos">Departamentos</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="prestaciones">Prestaciones</TabsTrigger>
            <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
          </TabsList>

          {/* Reporte General */}
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Distribución de Costos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Salarios Base</span>
                      <span className="text-sm font-bold">${metricas.totalSalarios.toFixed(0)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Descuentos Totales</span>
                      <span className="text-sm font-bold">${metricas.totalDescuentos.toFixed(0)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Promedio Salarial</span>
                        <span className="text-lg font-bold text-teal-800">${metricas.promedioSalario.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Resumen Consolidado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <p className="text-sm text-teal-800">Registros Procesados</p>
                        <p className="text-2xl font-bold text-teal-800">{datosFiltrados.length}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">Empleados Únicos</p>
                        <p className="text-2xl font-bold text-blue-800">{metricas.empleadosUnicos}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">AFP Total:</span>
                        <span className="font-medium">
                          ${datosFiltrados.reduce((sum, p) => sum + p.descuentoAfp, 0).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ISSS Total:</span>
                        <span className="font-medium">
                          ${datosFiltrados.reduce((sum, p) => sum + p.descuentoIsss, 0).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Renta Total:</span>
                        <span className="font-medium">
                          ${datosFiltrados.reduce((sum, p) => sum + p.descuentoRenta, 0).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reporte por Empleados */}
          <TabsContent value="empleados" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Detalle por Empleado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Empleado</th>
                        <th className="text-left p-2">Cargo</th>
                        <th className="text-right p-2">Salario Base</th>
                        <th className="text-right p-2">Descuentos</th>
                        <th className="text-right p-2">Líquido</th>
                        <th className="text-right p-2">Registros</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(
                        datosFiltrados.reduce((acc, planilla) => {
                          if (!acc[planilla.duiEmpleado]) {
                            acc[planilla.duiEmpleado] = {
                              nombre: planilla.nombreEmpleado,
                              cargo: planilla.cargoEmpleado,
                              salarioBase: 0,
                              descuentos: 0,
                              liquido: 0,
                              registros: 0,
                            }
                          }
                          acc[planilla.duiEmpleado].salarioBase += planilla.salarioBase
                          acc[planilla.duiEmpleado].descuentos += planilla.totalDescuentos
                          acc[planilla.duiEmpleado].liquido += planilla.liquidoPagar
                          acc[planilla.duiEmpleado].registros += 1
                          return acc
                        }, {}),
                      ).map((empleado, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{empleado.nombre}</td>
                          <td className="p-2">{empleado.cargo}</td>
                          <td className="p-2 text-right">${empleado.salarioBase.toFixed(0)}</td>
                          <td className="p-2 text-right">${empleado.descuentos.toFixed(0)}</td>
                          <td className="p-2 text-right font-bold">${empleado.liquido.toFixed(0)}</td>
                          <td className="p-2 text-right">{empleado.registros}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reporte de Asistencia */}
          <TabsContent value="asistencia" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Horas Extras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">Total Horas Extras</p>
                      <p className="text-2xl font-bold text-yellow-800">{metricas.totalHorasExtras.toFixed(1)}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Diurnas:</span>
                        <span className="font-medium">
                          {datosFiltrados.reduce((sum, p) => sum + p.horasEDiurnas, 0).toFixed(1)}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Nocturnas:</span>
                        <span className="font-medium">
                          {datosFiltrados.reduce((sum, p) => sum + p.horasENocturnas, 0).toFixed(1)}h
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Ausencias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-red-800">Total Incapacidades</p>
                      <p className="text-2xl font-bold text-red-800">${metricas.totalIncapacidades.toFixed(0)}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Vacaciones:</span>
                        <span className="font-medium">${metricas.totalVacaciones.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Asuetos:</span>
                        <span className="font-medium">
                          ${datosFiltrados.reduce((sum, p) => sum + p.asuetos, 0).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Productividad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">Días Laborados</p>
                      <p className="text-2xl font-bold text-green-800">
                        {datosFiltrados.reduce((sum, p) => sum + p.diasLaborados, 0).toFixed(0)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Horas Ausentes:</span>
                        <span className="font-medium">
                          {datosFiltrados.reduce((sum, p) => sum + p.horasAusentes, 0).toFixed(1)}h
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reporte por Departamentos */}
          <TabsContent value="departamentos" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Análisis por Cargo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Cargo</th>
                        <th className="text-center p-2">Empleados</th>
                        <th className="text-right p-2">Total Salarios</th>
                        <th className="text-right p-2">Promedio</th>
                        <th className="text-right p-2">Total Líquido</th>
                        <th className="text-right p-2">% del Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datosPorCargo.map((cargo: GrupoCargo & { empleados: number; promedioSalario: number }, index: number) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{cargo.cargo}</td>
                          <td className="p-2 text-center">{cargo.empleados}</td>
                          <td className="p-2 text-right">${cargo.totalSalarios.toFixed(0)}</td>
                          <td className="p-2 text-right">${cargo.promedioSalario.toFixed(0)}</td>
                          <td className="p-2 text-right font-bold">${cargo.totalLiquido.toFixed(0)}</td>
                          <td className="p-2 text-right">
                            {((cargo.totalSalarios / metricas.totalSalarios) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reporte Legal */}
          <TabsContent value="legal" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Cumplimiento Legal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">Aportes Patronales</p>
                      <p className="text-lg font-bold text-blue-800">
                        $
                        {(datosFiltrados.reduce((sum, p) => sum + p.descuetoAfp + p.descuentoIsss, 0) * 0.15).toFixed(
                          0,
                        )}
                      </p>
                      <p className="text-xs text-blue-600">Estimado (15% adicional)</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Desglose de Descuentos:</h4>
                      <div className="flex justify-between">
                        <span className="text-sm">AFP (8.25%):</span>
                        <span className="font-medium">
                          ${datosFiltrados.reduce((sum, p) => sum + p.descuetoAfp, 0).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ISSS (7.5%):</span>
                        <span className="font-medium">
                          ${datosFiltrados.reduce((sum, p) => sum + p.descuentoIsss, 0).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Renta:</span>
                        <span className="font-medium">
                          ${datosFiltrados.reduce((sum, p) => sum + p.descuentoRenta, 0).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Verificación Salario Mínimo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">Cumplimiento</p>
                      <p className="text-lg font-bold text-green-800">100%</p>
                      <p className="text-xs text-green-600">Todos los salarios cumplen</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Estadísticas Salariales:</h4>
                      <div className="flex justify-between">
                        <span className="text-sm">Salario Mínimo:</span>
                        <span className="font-medium">$365.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Salario Más Bajo:</span>
                        <span className="font-medium">
                          ${Math.min(...datosFiltrados.map((p) => p.salarioBase)).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Salario Más Alto:</span>
                        <span className="font-medium">
                          ${Math.max(...datosFiltrados.map((p) => p.salarioBase)).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reporte de Prestaciones */}
          <TabsContent value="prestaciones" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Vacaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-800">Acumulado Total</p>
                      <p className="text-2xl font-bold text-purple-800">${metricas.totalVacaciones.toFixed(0)}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      Promedio por empleado: ${(metricas.totalVacaciones / metricas.empleadosUnicos).toFixed(0)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Incapacidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-orange-800">Total Utilizado</p>
                      <p className="text-2xl font-bold text-orange-800">${metricas.totalIncapacidades.toFixed(0)}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      Empleados con incapacidades: {datosFiltrados.filter((p) => p.incapacidades > 0).length}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Beneficios Adicionales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <p className="text-sm text-indigo-800">Horas Extras</p>
                      <p className="text-2xl font-bold text-indigo-800">{metricas.totalHorasExtras.toFixed(1)}h</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      Empleados con horas extras:{" "}
                      {datosFiltrados.filter((p) => p.horasEDiurnas > 0 || p.horasENocturnas > 0).length}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reporte de Tendencias */}
          <TabsContent value="tendencias" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Evolución Mensual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Período</th>
                        <th className="text-center p-2">Empleados</th>
                        <th className="text-right p-2">Total Salarios</th>
                        <th className="text-right p-2">Total Descuentos</th>
                        <th className="text-right p-2">Líquido a Pagar</th>
                        <th className="text-right p-2">Variación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tendenciasMensuales.map((mes: MesData & { empleados: number }, index: number) => {
                        const variacion: number = index > 0 && tendenciasMensuales[index - 1]?.totalLiquido > 0
                          ? ((mes.totalLiquido - (tendenciasMensuales[index - 1]?.totalLiquido || 0)) /
                              (tendenciasMensuales[index - 1]?.totalLiquido || 1)) * 100
                          : 0;

                        return (
                          <tr key={mes.periodo} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-medium">
                              {mes.periodo.charAt(0).toUpperCase() + mes.periodo.slice(1).replace("-", " ")}
                            </td>
                            <td className="p-2 text-center">{mes.empleados}</td>
                            <td className="p-2 text-right">${mes.totalSalarios.toFixed(0)}</td>
                            <td className="p-2 text-right">${mes.totalDescuentos.toFixed(0)}</td>
                            <td className="p-2 text-right font-bold">${mes.totalLiquido.toFixed(0)}</td>
                            <td className={`p-2 text-right ${variacion >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {index > 0 ? `${variacion >= 0 ? "+" : ""}${variacion.toFixed(1)}%` : "-"}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Proyección Anual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-teal-800">Costo Anual Estimado</p>
                      <p className="text-2xl font-bold text-teal-800">${(metricas.totalLiquido * 12).toFixed(0)}</p>
                      <p className="text-xs text-teal-600">Basado en promedio actual</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Salarios Anuales:</span>
                        <span className="font-medium">${(metricas.totalSalarios * 12).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Descuentos Anuales:</span>
                        <span className="font-medium">${(metricas.totalDescuentos * 12).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Indicadores Clave</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-xs text-yellow-800">Rotación</p>
                        <p className="text-lg font-bold text-yellow-800">0%</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-green-800">Crecimiento</p>
                        <p className="text-lg font-bold text-green-800">+5.2%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Costo por Empleado:</span>
                        <span className="font-medium">
                          ${(metricas.totalLiquido / metricas.empleadosUnicos).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Eficiencia de Descuentos:</span>
                        <span className="font-medium">{metricas.porcentajeDescuentos.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
