"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet, Printer } from "lucide-react";
import { ResumenPlanillaGeneral } from "@/lib/api";

interface ResumenPlanillasProps {
  resumen: ResumenPlanillaGeneral;
  onExportarExcel: () => void;
  onImprimir: () => void;
}

export function ResumenPlanillas({ resumen, onExportarExcel, onImprimir }: ResumenPlanillasProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Calcular totales
  const totalSalario = resumen.detalleEmpleados.reduce((sum, e) => sum + e.salario, 0);
  const totalHorasExtras = resumen.detalleEmpleados.reduce((sum, e) => sum + (e.ingresos || 0), 0);
  const totalDescuentos = resumen.detalleEmpleados.reduce((sum, e) => sum + e.descuentos, 0);
  const totalLiquido = resumen.detalleEmpleados.reduce((sum, e) => sum + e.liquido, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Resumen de Planilla</h2>
          <p className="text-sm text-muted-foreground">
            {new Date(parseInt(resumen.anio), parseInt(resumen.mes) - 1, 1).toLocaleString('es-ES', {
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={onExportarExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" onClick={onImprimir}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Empleado</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead className="text-right">Salario</TableHead>
              <TableHead className="text-right">Horas Extras</TableHead>
              <TableHead className="text-right">Descuentos</TableHead>
              <TableHead className="text-right">Líquido</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumen.detalleEmpleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell className="font-medium">{empleado.nombre}</TableCell>
                <TableCell className="text-muted-foreground">{empleado.cargo}</TableCell>
                <TableCell className="text-right">{formatCurrency(empleado.salario)}</TableCell>
                <TableCell className="text-right">{formatCurrency(empleado.ingresos || 0)}</TableCell>
                <TableCell className="text-right">-{formatCurrency(empleado.descuentos)}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(empleado.liquido)}</TableCell>
              </TableRow>
            ))}
            {/* Fila de totales */}
            <TableRow className="bg-muted/50 font-medium">
              <TableCell colSpan={2} className="text-right">Total</TableCell>
              <TableCell className="text-right">{formatCurrency(totalSalario)}</TableCell>
              <TableCell className="text-right">{formatCurrency(totalHorasExtras)}</TableCell>
              <TableCell className="text-right">-{formatCurrency(totalDescuentos)}</TableCell>
              <TableCell className="text-right font-bold">{formatCurrency(totalLiquido)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
