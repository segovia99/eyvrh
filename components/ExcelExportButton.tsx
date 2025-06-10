"use client";

import { Button } from "@/components/ui/button";
import { ExcelExportData, PlanillaEmpleado } from "@/lib/api";
import { Download } from "lucide-react";
import { prepareExcelExportData } from "@/lib/api";
import { exportToExcelWithFormatting } from "@/lib/utils/excelExport";

interface ExcelExportButtonProps {
  planillas: PlanillaEmpleado[];
  mes: string;
  anio: string;
  className?: string;
  disabled?: boolean;
}

export function ExcelExportButton({ 
  planillas, 
  mes, 
  anio, 
  className = "",
  disabled = false
}: ExcelExportButtonProps) {
  const handleExport = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled) return;
    
    try {
      // Preparar los datos para la exportación
      const exportData = await prepareExcelExportData(planillas, mes, anio);
      
      // Generar el archivo Excel con formato
      exportToExcelWithFormatting(exportData);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      alert("Ocurrió un error al exportar a Excel. Por favor, intente de nuevo.");
    }
  };

  return (
    <Button 
      onClick={handleExport}
      className={`flex items-center gap-2 ${className}`}
      variant="outline"
      disabled={disabled}
    >
      <Download className="h-4 w-4" />
      Exportar a Excel
    </Button>
  );
}
