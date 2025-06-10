import * as XLSX from 'xlsx-js-style';
import { ExcelExportData } from '../api';

export const exportToExcelWithFormatting = (exportData: ExcelExportData) => {
  try {
    if (!exportData.datos || exportData.datos.length === 0) {
      throw new Error('No hay datos para exportar');
    }

    // Crear un nuevo libro de trabajo
    const wb = XLSX.utils.book_new();
    
    // Crear hoja de cálculo vacía
    const ws = XLSX.utils.aoa_to_sheet([[]]);
    
    // Añadir título
    XLSX.utils.sheet_add_aoa(ws, [[exportData.titulo]], { origin: 'A1' });
    
    // Obtener los encabezados de las columnas
    const headers = Object.keys(exportData.datos[0] || {});
    
    // Añadir encabezados
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A2' });
    
    // Añadir los datos
    const data = exportData.datos.map(row => headers.map(header => row[header as keyof typeof row]));
    XLSX.utils.sheet_add_aoa(ws, data, { origin: 'A3' });
    
    // Actualizar la referencia del rango de la hoja
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    range.e.r = data.length + 1; // +1 para el título, +1 para los encabezados
    ws['!ref'] = XLSX.utils.encode_range(range);
    
    // Combinar celdas para el título
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({ 
      s: { r: 0, c: 0 }, 
      e: { r: 0, c: headers.length - 1 } 
    });
    
    // Ajustar anchos de columna
    const columnWidths = [
      { wch: 30 }, // NOMBRE
      { wch: 15 }, // DUI
      { wch: 30 }, // CARGO
      { wch: 15 }, // SALARIO BASE
      { wch: 15 }, // DIAS LABORADOS
      { wch: 20 }, // SALARIO ORDINARIO
      { wch: 20 }, // HORAS EXTRAS DIURNAS
      { wch: 25 }, // HORAS EXTRAS NOCTURNAS
      { wch: 12 }, // ASUETOS
      { wch: 15 }, // VACACIONES
      { wch: 15 }, // INCAPACIDADES
      { wch: 15 }, // HORAS AUSENTES
      { wch: 15 }, // DIAS AUSENTES
      { wch: 18 }, // TOTAL DEVENGADO
      { wch: 15 }, // DESCUENTO AFP
      { wch: 15 }, // DESCUENTO ISSS
      { wch: 15 }, // DESCUENTO RENTA
      { wch: 18 }, // TOTAL DESCUENTOS
      { wch: 18 }, // LIQUIDO A PAGAR
    ];
    ws['!cols'] = columnWidths;
    
    // Aplicar estilos
    const headerStyle = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '4472C4' } }, // Azul corporativo
      alignment: { horizontal: 'center', vertical: 'center' },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } }
      }
    };
    
    const titleStyle = {
      font: { bold: true, size: 16 },
      alignment: { horizontal: 'center', vertical: 'center' },
      fill: { fgColor: { rgb: 'D9E1F2' } } // Azul claro
    };
    
    const numberStyle = {
      numFmt: '"$"#,##0.00_);[Red]("$"#,##0.00)',
      alignment: { horizontal: 'right' }
    };
    
    // Aplicar estilo al título
    const titleRange = XLSX.utils.decode_range(ws['!ref']!);
    for (let C = titleRange.s.c; C <= titleRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cellAddress]) ws[cellAddress] = {};
      ws[cellAddress].s = titleStyle;
    }
    
    // Aplicar estilos a los encabezados (fila 2, ya que la fila 1 es el título)
    const headerRow = 1; // Segunda fila (0-based)
    for (let C = 0; C < headers.length; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: C });
      if (!ws[cellAddress]) ws[cellAddress] = {};
      ws[cellAddress].s = headerStyle;
    }
    
    // Aplicar estilos a las celdas de datos (empezando desde la fila 3)
    const dataStartRow = 2;
    for (let R = dataStartRow; R < data.length + dataStartRow; R++) {
      for (let C = 0; C < headers.length; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;
        
        // Aplicar formato de número a las columnas monetarias
        const headerValue = headers[C];
        
        if ([
          'SALARIO BASE', 'SALARIO ORDINARIO', 'TOTAL DEVENGADO', 
          'DESCUENTO AFP', 'DESCUENTO ISSS', 'DESCUENTO RENTA', 
          'TOTAL DESCUENTOS', 'LIQUIDO A PAGAR'
        ].includes(headerValue)) {
          if (!ws[cellAddress].s) ws[cellAddress].s = {};
          ws[cellAddress].s = { 
            ...ws[cellAddress].s, 
            ...numberStyle,
            // Asegurar que los números se muestren con 2 decimales
            numFmt: '#,##0.00_);[Red](#,##0.00)'
          };
          
          // Formatear el valor como número
          const cellValue = ws[cellAddress].v;
          if (typeof cellValue === 'number') {
            ws[cellAddress].v = cellValue;
          }
        }
        
        // Alternar colores de fila para mejor legibilidad (solo filas de datos)
        if (R > 1) { // Saltar título y encabezados
          if (!ws[cellAddress].s) ws[cellAddress].s = {};
          ws[cellAddress].s.fill = { 
            fgColor: { rgb: (R % 2 === 0) ? 'FFFFFF' : 'F2F2F2' } 
          };
        }
        
        // Añadir bordes a todas las celdas
        if (!ws[cellAddress].s) ws[cellAddress].s = {};
        ws[cellAddress].s.border = {
          top: { style: 'thin', color: { rgb: 'D9D9D9' } },
          bottom: { style: 'thin', color: { rgb: 'D9D9D9' } },
          left: { style: 'thin', color: { rgb: 'D9D9D9' } },
          right: { style: 'thin', color: { rgb: 'D9D9D9' } }
        };
      }
    }
    
    // Añadir la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Planilla General');
    
    // Generar el archivo Excel
    const nombreArchivo = `Planilla_General_${exportData.mes}_${exportData.anio}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
    
    return nombreArchivo;
  } catch (error) {
    console.error('Error al exportar a Excel con formato:', error);
    throw new Error('Error al generar el archivo Excel con formato');
  }
};

export default exportToExcelWithFormatting;
