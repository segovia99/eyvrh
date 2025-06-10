"use server";

import authOptions from "@/app/api/auth/[...nextauth]/options";
import { BACKEND_URL } from "@/config-global";
import { Empleado } from "@/types/empleados";
import { Employee } from "@/validations/employee";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  const session = await getServerSession(authOptions);
  const response = await fetch(`${BACKEND_URL}/usuarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });

  const data = await response.json();

  const ordenado = data.sort((a:any, b:any) => b.id - a.id);


  return ordenado;
};

export const createUser = async (data: Employee) => {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${BACKEND_URL}/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify(data),
    });

    const dataJson = await response.json();

    revalidatePath('/empleados');

    return dataJson;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const session = await getServerSession(authOptions);
    await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    revalidatePath('/empleados');
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

export const getuser = async (id: number): Promise<Empleado> => {
  try {
    // console.log(id);
    const session = await getServerSession(authOptions);
    const response = await fetch(`${BACKEND_URL}/usuarios${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });


    const empleado = await response.json();

    return empleado;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};

export const updateEmpleado = async (id: number, data: Employee) => {
  try {
    const session = await getServerSession(authOptions);
    await fetch(`${BACKEND_URL}/modificar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify(data),
    });

    revalidatePath(`/empleados/${id}`);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

export interface PlanillaEmpleado {
  id: number;
  nombreEmpleado: string;
  cargoEmpleado: string;
  duiEmpleado: string;
  fechaInicio: string;
  fechaFin: string;
  salarioBase: number;
  salarioDia: number;
  diasLaborados: number;
  horasEDiurnas: number;
  horasENocturnas: number;
  horasAusentes: number;  // Agregado para coincidir con la respuesta del backend
  asuetos: number;
  incapacidades: number;
  vacaciones: number;
  diasAusentes: number;
  totalDevengado: number;
  totalIngresos: number;
  descuentoAfp?: number;  // Hacer opcional para compatibilidad
  descuetoAfp?: number;   // Campo del backend (notar la falta de 'n')
  descuentoIsss: number;
  descuentoRenta: number;
  totalDescuentos: number;
  liquidoPagar: number;
  mes: string;
  anio: string;
}

export const calcularPlanillaEmpleado = async (empleadoId: number, mes: string, anio: string): Promise<PlanillaEmpleado> => {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${BACKEND_URL}/planilla/crear/${empleadoId}/mes/${mes}/anio/${anio}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al calcular la planilla');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al calcular la planilla:', error);
    throw error;
  }
};

export const getPlanillasPorMesAnio = async (mes: string, anio: string): Promise<PlanillaEmpleado[]> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.token) {
      throw new Error('No se encontró el token de autenticación');
    }

    // Validar parámetros
    if (!mes || !anio) {
      throw new Error('El mes y el año son requeridos');
    }

    // Obtener todas las planillas (el backend actual no soporta filtrado)
    const response = await fetch(`${BACKEND_URL}/planillas`, {
      headers: {
        'Authorization': `Bearer ${session.user.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al obtener las planillas');
    }

    let data = await response.json();
    
    // Si no hay datos, retornar array vacío
    if (!data || !Array.isArray(data)) {
      return [];
    }
    
    // Filtrar por mes y año en el frontend
    data = data.filter((planilla: PlanillaEmpleado) => 
      planilla.mes === mes && planilla.anio === anio
    );

    // Eliminar duplicados, quedándonos con la planilla más reciente de cada empleado
    const uniquePayrolls = new Map<string, PlanillaEmpleado>();
    
    data.forEach((planilla: PlanillaEmpleado) => {
      // Usar el DUI del empleado como identificador único
      const empleadoDui = planilla.duiEmpleado;
      const existing = uniquePayrolls.get(empleadoDui);
      
      // Si no existe una planilla para este empleado o si la actual es más reciente
      if (!existing || new Date(planilla.fechaInicio) > new Date(existing.fechaInicio)) {
        uniquePayrolls.set(empleadoDui, planilla);
      }
    });
    
    // Convertir el Map de vuelta a un array
    return Array.from(uniquePayrolls.values());
  } catch (error) {
    console.error('Error al obtener las planillas:', error);
    if (error instanceof Error) {
      throw new Error(`Error al obtener planillas: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener planillas');
  }
};

// Interfaz para el detalle de empleado en el resumen
export interface EmpleadoResumen {
  id: number;
  nombre: string;
  cargo: string;
  salario: number;
  ingresos: number;
  descuentos: number;
  liquido: number;
  mes: string;
  anio: string;
}

// Interfaz para el resumen general de planillas
export interface ResumenPlanillaGeneral {
  id: string;
  mes: string;
  anio: string;
  fechaGeneracion: string;
  totalEmpleados: number;
  totalSalarios: number;
  totalIngresos: number;
  totalDescuentos: number;
  totalLiquido: number;
  detalleEmpleados: EmpleadoResumen[];
  estado?: string; // Make estado optional
}

// Función para generar un resumen consolidado de planillas
export const generarResumenPlanilla = async (planillas: PlanillaEmpleado[]): Promise<ResumenPlanillaGeneral> => {
  if (!planillas || planillas.length === 0) {
    throw new Error('No hay planillas para generar el resumen');
  }

  // Asumimos que todas las planillas son del mismo mes/año
  const primeraPlanilla = planillas[0];
  const mes = primeraPlanilla.mes;
  const anio = primeraPlanilla.anio;
  const id = `${mes}-${anio}`;
  
  // Validar que el mes y año sean válidos
  if (!mes || !anio) {
    throw new Error('El mes y el año son requeridos');
  }

  const mesNum = parseInt(mes, 10);
  const anioNum = parseInt(anio, 10);
  
  if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
    throw new Error('El mes debe ser un número entre 1 y 12');
  }
  
  if (isNaN(anioNum) || anioNum < 2000 || anioNum > 2100) {
    throw new Error('El año debe estar entre 2000 y 2100');
  }
  
  // Calcular totales
  const totalEmpleados = planillas.length;
  const totalSalarios = planillas.reduce((sum, p) => sum + (p.salarioBase || 0), 0);
  const totalIngresos = planillas.reduce((sum, p) => sum + (p.totalIngresos || 0), 0);
  const totalDescuentos = planillas.reduce((sum, p) => sum + (p.totalDescuentos || 0), 0);
  const totalLiquido = planillas.reduce((sum, p) => sum + (p.liquidoPagar || 0), 0);

  // Mapear el detalle de empleados
  const detalleEmpleados = planillas.map(planilla => ({
    id: planilla.id,
    nombre: planilla.nombreEmpleado,
    cargo: planilla.cargoEmpleado,
    salario: planilla.salarioBase,
    ingresos: planilla.totalIngresos,
    descuentos: planilla.totalDescuentos,
    liquido: planilla.liquidoPagar,
    mes: planilla.mes,
    anio: planilla.anio
  }));

  // Crear y retornar el resumen
  return {
    id,
    mes,
    anio,
    fechaGeneracion: new Date().toISOString(),
    totalEmpleados,
    totalSalarios,
    totalIngresos,
    totalDescuentos,
    totalLiquido,
    detalleEmpleados,
    estado: 'GENERADA'
  }
};

export const getPlanillaEmpleado = async (empleadoId: number, mes: string, anio: string): Promise<PlanillaEmpleado> => {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${BACKEND_URL}/planillas/empleado/${empleadoId}/mes/${mes}/anio/${anio}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener la planilla del empleado');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener la planilla del empleado:', error);
    throw error;
  }
};

// Función para obtener el registro más reciente por empleado y mes/año
const getUltimasPlanillas = (planillas: PlanillaEmpleado[]): PlanillaEmpleado[] => {
  const planillasUnicas = new Map<string, PlanillaEmpleado>();
  
  // Ordenar por ID para asegurar que tomamos el más reciente (asumiendo que ID más alto = más reciente)
  const planillasOrdenadas = [...planillas].sort((a, b) => b.id - a.id);
  
  // Usar un Map para mantener solo el registro más reciente por empleado y mes/año
  planillasOrdenadas.forEach(planilla => {
    const clave = `${planilla.duiEmpleado}-${planilla.mes}-${planilla.anio}`;
    if (!planillasUnicas.has(clave)) {
      planillasUnicas.set(clave, planilla);
    }
  });
  
  return Array.from(planillasUnicas.values());
};

// Interfaz para los datos formateados de Excel
export interface ExcelPlanillaData {
  'NOMBRE': string;
  'DUI': string;
  'CARGO': string;
  'SALARIO BASE': number;
  'DIAS LABORADOS': number;
  'SALARIO ORDINARIO': number;
  'HORAS EXTRAS DIURNAS': number;
  'HORAS EXTRAS NOCTURNAS': number;
  'ASUETOS': number;
  'VACACIONES': number;
  'INCAPACIDADES': number;
  'HORAS AUSENTES': number;
  'DIAS AUSENTES': number;
  'TOTAL DEVENGADO': number;
  'DESCUENTO AFP': number;
  'DESCUENTO ISSS': number;
  'DESCUENTO RENTA': number;
  'TOTAL DESCUENTOS': number;
  'LIQUIDO A PAGAR': number;
}

export interface ExcelExportData {
  titulo: string;
  mes: string;
  anio: string;
  datos: ExcelPlanillaData[];
}

export const prepareExcelExportData = async (planillas: PlanillaEmpleado[], mes: string, anio: string): Promise<ExcelExportData> => {
  // Filtrar solo las planillas del mes y año especificados y obtener las últimas por empleado
  const planillasFiltradas = getUltimasPlanillas(planillas)
    .filter(p => p.mes === mes && p.anio === anio);
  
  if (planillasFiltradas.length === 0) {
    throw new Error(`No hay datos de planillas para ${mes}/${anio}`);
  }
  
  // Formatear los datos para Excel
  const datos: ExcelPlanillaData[] = planillasFiltradas.map(planilla => ({
    'NOMBRE': planilla.nombreEmpleado || 'No especificado',
    'DUI': planilla.duiEmpleado || 'No especificado',
    'CARGO': planilla.cargoEmpleado || 'No especificado',
    'SALARIO BASE': planilla.salarioBase || 0,
    'DIAS LABORADOS': planilla.diasLaborados || 0,
    'SALARIO ORDINARIO': (planilla.salarioBase || 0) * ((planilla.diasLaborados || 0) / 30 || 0),
    'HORAS EXTRAS DIURNAS': planilla.horasEDiurnas || 0,
    'HORAS EXTRAS NOCTURNAS': planilla.horasENocturnas || 0,
    'ASUETOS': planilla.asuetos || 0,
    'VACACIONES': planilla.vacaciones || 0,
    'INCAPACIDADES': planilla.incapacidades || 0,
    'HORAS AUSENTES': planilla.horasAusentes || 0,
    'DIAS AUSENTES': planilla.diasAusentes || 0,
    'TOTAL DEVENGADO': planilla.totalDevengado || 0,
    'DESCUENTO AFP': planilla.descuetoAfp || planilla.descuentoAfp || 0,
    'DESCUENTO ISSS': planilla.descuentoIsss || 0,
    'DESCUENTO RENTA': planilla.descuentoRenta || 0,
    'TOTAL DESCUENTOS': planilla.totalDescuentos || 0,
    'LIQUIDO A PAGAR': planilla.liquidoPagar || 0,
  }));
  
  return {
    titulo: `PLANILLA GENERAL DE SALARIOS - ${mes.toUpperCase()}/${anio}`,
    mes,
    anio,
    datos
  };
};

// Genera planillas para todos los empleados activos
export const generarPlanillasTodosEmpleados = async (mes: string, anio: string): Promise<boolean> => {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${BACKEND_URL}/planillas/crear/mes/${mes}/anio/${anio}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al generar planillas');
    }

    // El endpoint no retorna datos, solo confirma que se procesó la solicitud
    return true;
  } catch (error) {
    console.error('Error al generar planillas:', error);
    throw error;
  }
};

// Esta función se llamará desde el cliente para generar el Excel con formato
export const generateExcelWithFormatting = async (exportData: ExcelExportData) => {
  try {
    // Esta función se implementará en el cliente usando la biblioteca xlsx
    // para aplicar los estilos y formato
    return exportData;
  } catch (error) {
    console.error('Error al preparar datos para Excel:', error);
    throw new Error('Error al preparar datos para Excel');
  }
};