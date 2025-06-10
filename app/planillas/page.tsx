"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  calcularPlanillaEmpleado, 
  getPlanillasPorMesAnio, 
  getUsers, 
  generarPlanillasTodosEmpleados, 
  generarResumenPlanilla, 
  type PlanillaEmpleado, 
  type ResumenPlanillaGeneral 
} from "@/lib/api";
import { Plus, Calendar, FileDown } from "lucide-react"
import { toast } from 'sonner';
import { ExcelExportButton } from "@/components/ExcelExportButton";
import { CalcularPlanillaForm } from "@/components/planillas/calcular-planilla-form"
import { DetallePlanilla } from "@/components/planillas/detalle-planilla"
import { ResumenPlanillas } from "@/components/planillas/resumen-planillas"
import { SeleccionarEmpleado } from "@/components/planillas/seleccionar-empleado"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Meses para el selector
const meses = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
];

// Años para el selector
const anios = [
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

const PlanillasPage: FC = () => {
  const [mes, setMes] = useState<string>((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [anio, setAnio] = useState<string>(new Date().getFullYear().toString());
  const [planillas, setPlanillas] = useState<PlanillaEmpleado[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPlanilla, setSelectedPlanilla] = useState<PlanillaEmpleado | null>(null);
  const [showCalculoForm, setShowCalculoForm] = useState<boolean>(false);
  const [showSeleccionarEmpleado, setShowSeleccionarEmpleado] = useState<boolean>(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<{id: number, nombre: string} | null>(null);
  const [empleados, setEmpleados] = useState<{id: number, nombre: string}[]>([]);
  const [showResumen, setShowResumen] = useState<boolean>(false);
  const [resumenPlanilla, setResumenPlanilla] = useState<ResumenPlanillaGeneral | null>(null);

  // Función para formatear números con separadores de miles y dos decimales
  const formatCurrency = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Función para formatear fechas
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-SV', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para exportar a Excel
  const handleExportExcel = async (): Promise<void> => {
    if (!resumenPlanilla || resumenPlanilla.detalleEmpleados.length === 0) {
      toast.error('No hay datos para exportar');
      return;
    }
    
    try {
      setLoading(true);
      
      // Importar dinámicamente xlsx solo en el cliente
      const XLSX = await import('xlsx');
      
      // Crear un nuevo libro de trabajo
      const wb = XLSX.utils.book_new();
      
      // Formatear los datos para Excel
      const excelData = resumenPlanilla.detalleEmpleados.map(emp => ({
        'NOMBRE': emp.nombre || '',
        'CARGO': emp.cargo || '',
        'SALARIO BASE': emp.salario || 0,
        'INGRESOS': emp.ingresos || 0,
        'DESCUENTOS': emp.descuentos || 0,
        'LIQUIDO A PAGAR': emp.liquido || 0,
      }));
      
      // Crear hoja de cálculo
      const ws = XLSX.utils.json_to_sheet(excelData);
      
      // Añadir título
      const mesNombre = meses.find(m => m.value === mes)?.label || mes;
      const titulo = `PLANILLA GENERAL DE SALARIOS - ${mesNombre.toUpperCase()} ${anio}`;
      XLSX.utils.sheet_add_aoa(ws, [[titulo]], { origin: 'A1' });
      
      // Combinar celdas para el título
      if (!ws['!merges']) ws['!merges'] = [];
      ws['!merges'].push({ 
        s: { r: 0, c: 0 }, 
        e: { r: 0, c: Object.keys(excelData[0] || {}).length - 1 } 
      });
      
      // Ajustar anchos de columna
      const columnWidths = [
        { wch: 30 }, // NOMBRE
        { wch: 30 }, // CARGO
        { wch: 15 }, // SALARIO BASE
        { wch: 15 }, // INGRESOS
        { wch: 15 }, // DESCUENTOS
        { wch: 20 }, // LIQUIDO A PAGAR
      ];
      ws['!cols'] = columnWidths;
      
      // Añadir la hoja al libro
      XLSX.utils.book_append_sheet(wb, ws, 'Planilla General');
      
      // Generar el archivo Excel
      const nombreArchivo = `Planilla_${mes}_${anio}.xlsx`;
      XLSX.writeFile(wb, nombreArchivo);
      
      toast.success('Archivo exportado correctamente');
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      toast.error('Error al exportar a Excel');
    } finally {
      setLoading(false);
    }
  };
  
  // Manejar la generación de planillas
  const handleGenerarPlanillas = async (): Promise<void> => {
    setLoading(true);
    try {
      const exito = await generarPlanillasTodosEmpleados(mes, anio);
      if (exito) {
        // Recargar las planillas individuales para actualizar la vista
        await cargarPlanillas();
        
        // Mostrar mensaje de éxito
        toast.success('Planillas generadas exitosamente');
      } else {
        throw new Error('No se pudo generar las planillas');
      }
    } catch (error) {
      console.error('Error al generar planillas:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al generar las planillas';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Obtener el nombre del mes
  const getMonthName = (month: string) => {
    const date = new Date(2000, parseInt(month) - 1, 1);
    return date.toLocaleString('es-ES', { month: 'long' });
  };

  // Cargar planillas del mes y año seleccionados
  const cargarPlanillas = async (): Promise<void> => {
    try {
      const data = await getPlanillasPorMesAnio(mes, anio);
      if (data) {
        setPlanillas(data);
        
        // Si hay planillas, generar el resumen
        if (data.length > 0) {
          const resumen = await generarResumenPlanilla(data);
          if (resumen) {
            setResumenPlanilla(resumen);
            setShowResumen(true);
          } else {
            setResumenPlanilla(null);
            setShowResumen(false);
          }
        } else {
          setResumenPlanilla(null);
          setShowResumen(false);
        }
      }
    } catch (error) {
      console.error('Error al cargar planillas:', error);
      toast.error('Error al cargar las planillas');
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar las planillas al montar el componente
  useEffect(() => {
    cargarPlanillas();
    cargarEmpleados();
  }, [mes, anio]);

  // Cargar lista de empleados
  const cargarEmpleados = async () => {
    try {
      const data = await getUsers();
      setEmpleados(data.map((emp: any) => ({
        id: emp.id,
        nombre: emp.nombre
      })));
    } catch (error) {
      console.error('Error al cargar empleados:', error);
      toast.error('Error al cargar la lista de empleados');
    }
  };

  // Manejar cálculo de planilla para un empleado
  const handleCalcularPlanilla = async (empleadoId: number, mes: string, anio: string) => {
    try {
      setLoading(true);
      const planilla = await calcularPlanillaEmpleado(empleadoId, mes, anio);
      toast.success('Planilla calculada correctamente');
      setSelectedPlanilla(planilla);
      setShowCalculoForm(false);
      // Recargar la lista de planillas
      await cargarPlanillas();
    } catch (error) {
      console.error('Error al calcular la planilla:', error);
      toast.error('Error al calcular la planilla');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cálculo de planillas para todos los empleados
  const handleCalcularTodasPlanillas = async () => {
    if (!window.confirm('¿Está seguro que desea generar las planillas para todos los empleados?')) {
      return;
    }

    try {
      setLoading(true);
      setShowResumen(false);
      toast.info('Generando planillas para todos los empleados...');
      
      const exito = await generarPlanillasTodosEmpleados(mes, anio);
      
      if (exito) {
        // Recargar la lista de planillas para mostrar las recién generadas
        await cargarPlanillas();
        toast.success('Planillas generadas exitosamente');
      } else {
        throw new Error('No se pudo generar las planillas');
      }
    } catch (error) {
      console.error('Error al generar las planillas:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al generar las planillas';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Manejar exportación a Excel
  const handleExportarExcel = () => {
    // Implementar lógica de exportación a Excel
    toast.info('Funcionalidad de exportación a Excel en desarrollo');
  };

  // Manejar impresión
  const handleImprimir = () => {
    window.print();
  };

  // Cerrar el resumen
  const handleCerrarResumen = () => {
    setShowResumen(false);
  };

  // Manejar la selección de una planilla
  const handleSelectPlanilla = (planilla: PlanillaEmpleado) => {
    setSelectedPlanilla(planilla);
  };

  // Manejar la apertura del formulario de selección de empleado
  const handleNuevoCalculo = () => {
    setShowSeleccionarEmpleado(true);
  };

  // Manejar la selección de un empleado
  const handleEmpleadoSeleccionado = (empleado: {id: number, nombre: string} | null) => {
    if (empleado) {
      setEmpleadoSeleccionado(empleado);
      setShowSeleccionarEmpleado(false);
      setShowCalculoForm(true);
    }
  };

  // Manejar cancelación del formulario de cálculo
  const handleCancelarCalculo = () => {
    setShowCalculoForm(false);
    setEmpleadoSeleccionado(null);
  };

  // Manejar cálculo exitoso
  const handleCalculoExitoso = (planilla: PlanillaEmpleado | null) => {
    if (planilla) {
      setSelectedPlanilla(planilla);
      setShowCalculoForm(false);
      setEmpleadoSeleccionado(null);
      cargarPlanillas();
    }
  };

  return (
    <Layout title="Gestión de Planillas">
      <div className="space-y-6">
        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Select value={mes} onValueChange={setMes}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {meses.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={anio} onValueChange={setAnio}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent>
                    {anios.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button 
                  onClick={handleGenerarPlanillas}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                >
                  {loading ? 'Generando...' : 'Generar Planillas'}
                </Button>
                <ExcelExportButton 
                  planillas={planillas}
                  mes={mes}
                  anio={anio}
                  disabled={!resumenPlanilla || loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de planillas */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Planillas</CardTitle>
                <CardDescription>
                  {getMonthName(mes)} {anio}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleCalcularTodasPlanillas}
                  disabled={loading}
                  title="Generar planillas para todos los empleados"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Generar Todas
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleNuevoCalculo}
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Planilla
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : planillas.length > 0 ? (
                <div className="space-y-2">
                  {planillas.map((planilla) => (
                    <div 
                      key={planilla.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedPlanilla?.id === planilla.id 
                          ? 'bg-teal-50 border border-teal-200' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                      onClick={() => handleSelectPlanilla(planilla)}
                    >
                      <div className="font-medium">{planilla.nombreEmpleado}</div>
                      <div className="text-sm text-gray-500">{planilla.cargoEmpleado}</div>
                      <div className="text-sm font-semibold text-teal-700">
                        {formatCurrency(planilla.liquidoPagar)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No hay planillas generadas para este período
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Panel de detalles */}
        <div className="lg:col-span-2">
          {showResumen && resumenPlanilla ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Resumen de Planilla General</h2>
                <Button variant="outline" onClick={handleCerrarResumen}>
                  Cerrar Resumen
                </Button>
              </div>
              {resumenPlanilla ? (
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Resumen de Planilla</CardTitle>
                        <CardDescription>
                          {getMonthName(mes).charAt(0).toUpperCase() + getMonthName(mes).slice(1)} {anio} - 
                          {resumenPlanilla.fechaGeneracion && ` Generado el ${formatDate(resumenPlanilla.fechaGeneracion)}`}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          resumenPlanilla.estado === 'APROBADA' ? 'bg-green-100 text-green-800' :
                          resumenPlanilla.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {resumenPlanilla.estado || 'SIN ESTADO'}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Total Empleados</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{resumenPlanilla.totalEmpleados}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Total Salarios</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{formatCurrency(resumenPlanilla.totalSalarios)}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Horas Extras</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{formatCurrency(resumenPlanilla.totalIngresos || 0)}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Total Descuentos</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{formatCurrency(resumenPlanilla.totalDescuentos)}</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="border rounded-md">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b">
                            <tr className="border-b">
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Empleado</th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cargo</th>
                              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Salario Base</th>
                              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Horas Extras</th>
                              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Descuentos</th>
                              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Líquido</th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            {resumenPlanilla.detalleEmpleados.map((empleado) => (
                              <tr key={empleado.id} className="border-b hover:bg-muted/50">
                                <td className="p-4 align-middle">{empleado.nombre}</td>
                                <td className="p-4 align-middle text-muted-foreground">{empleado.cargo}</td>
                                <td className="p-4 text-right align-middle">{formatCurrency(empleado.salario)}</td>
                                <td className="p-4 text-right align-middle">{formatCurrency(empleado.ingresos || 0)}</td>
                                <td className="p-4 text-right align-middle">{formatCurrency(empleado.descuentos)}</td>
                                <td className="p-4 text-right align-middle font-medium">{formatCurrency(empleado.liquido)}</td>
                              </tr>
                            ))}
                            <tr className="border-t font-bold bg-muted/50">
                              <td colSpan={2} className="p-4 text-right">TOTALES</td>
                              <td className="p-4 text-right">{formatCurrency(resumenPlanilla.totalSalarios)}</td>
                              <td className="p-4 text-right">{formatCurrency(resumenPlanilla.totalIngresos || 0)}</td>
                              <td className="p-4 text-right">{formatCurrency(resumenPlanilla.totalDescuentos)}</td>
                              <td className="p-4 text-right">{formatCurrency(resumenPlanilla.totalLiquido)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
                  <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No hay planillas generadas</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Selecciona un período y genera las planillas para comenzar.
                  </p>
                  <Button onClick={handleGenerarPlanillas} disabled={loading}>
                    {loading ? 'Generando...' : 'Generar Planillas'}
                  </Button>
                </div>
              )}
            </div>
          ) : showSeleccionarEmpleado ? (
            <SeleccionarEmpleado 
              onSeleccionar={handleEmpleadoSeleccionado}
              onCancel={() => setShowSeleccionarEmpleado(false)}
            />
          ) : showCalculoForm && empleadoSeleccionado ? (
            <CalcularPlanillaForm
              empleadoId={empleadoSeleccionado.id}
              empleadoNombre={empleadoSeleccionado.nombre}
              onCalculated={handleCalculoExitoso}
              onCancel={handleCancelarCalculo}
            />
          ) : selectedPlanilla ? (
            <DetallePlanilla planilla={selectedPlanilla} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Seleccione una planilla</CardTitle>
                <CardDescription>
                  {planillas.length > 0 
                    ? 'Seleccione una planilla de la lista para ver los detalles'
                    : 'No hay planillas disponibles para el período seleccionado'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">
                  {planillas.length > 0 
                    ? 'Seleccione una planilla para ver los detalles'
                    : 'Utilice el botón "Nueva Planilla" para generar una'}
                </p>
              </CardContent>
            </Card>
          )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlanillasPage;
