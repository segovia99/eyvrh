import { PlanillaEmpleado } from './api';

export const exportPlanillaToExcel = (planillas: PlanillaEmpleado[], mes: string, anio: string) => {
  // Dynamic import to only load xlsx in the browser
  import('xlsx').then(XLSX => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Format data for Excel
    const excelData = planillas.map(planilla => ({
      'NOMBRE': planilla.nombreEmpleado,
      'DUI': planilla.duiEmpleado,
      'CARGO': planilla.cargoEmpleado,
      'SALARIO BASE': planilla.salarioBase,
      'DIAS LABORADOS': planilla.diasLaborados,
      'SALARIO ORDINARIO': planilla.salarioBase * (planilla.diasLaborados / 30),
      'HORAS EXTRAS DIURNAS': planilla.horasEDiurnas,
      'HORAS EXTRAS NOCTURNAS': planilla.horasENocturnas,
      'ASUETOS': planilla.asuetos,
      'VACACIONES': planilla.vacaciones,
      'INCAPACIDADES': planilla.incapacidades,
      'DIAS AUSENTES': planilla.diasAusentes,
      'TOTAL INGRESOS': planilla.totalIngresos,
      'DESCUENTO AFP': planilla.descuentoAfp,
      'DESCUENTO ISSS': planilla.descuentoIsss,
      'DESCUENTO RENTA': planilla.descuentoRenta,
      'TOTAL DESCUENTOS': planilla.totalDescuentos,
      'LIQUIDO A PAGAR': planilla.liquidoPagar,
    }));
    
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Add title
    const title = `PLANILLA GENERAL DE SALARIOS - ${mes.toUpperCase()}/${anio}`;
    XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: 'A1' });
    
    // Merge title cells
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({ 
      s: { r: 0, c: 0 }, 
      e: { r: 0, c: Object.keys(excelData[0] || {}).length - 1 } 
    });
    
    // Set column widths
    const columnWidths = [
      { wch: 25 }, // NOMBRE
      { wch: 15 }, // DUI
      { wch: 25 }, // CARGO
      { wch: 15 }, // SALARIO BASE
      { wch: 15 }, // DIAS LABORADOS
      { wch: 20 }, // SALARIO ORDINARIO
      { wch: 20 }, // HORAS EXTRAS DIURNAS
      { wch: 25 }, // HORAS EXTRAS NOCTURNAS
      { wch: 12 }, // ASUETOS
      { wch: 15 }, // VACACIONES
      { wch: 15 }, // INCAPACIDADES
      { wch: 15 }, // DIAS AUSENTES
      { wch: 20 }, // TOTAL INGRESOS
      { wch: 20 }, // DESCUENTO AFP
      { wch: 20 }, // DESCUENTO ISSS
      { wch: 20 }, // DESCUENTO RENTA
      { wch: 20 }, // TOTAL DESCUENTOS
      { wch: 20 }, // LIQUIDO A PAGAR
    ];
    ws['!cols'] = columnWidths;
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Planilla General');
    
    // Generate Excel file
    const fileName = `Planilla_General_${mes}_${anio}.xlsx`;
    XLSX.writeFile(wb, fileName);
    
    return fileName;
  }).catch(error => {
    console.error('Error loading xlsx library:', error);
  });
};
