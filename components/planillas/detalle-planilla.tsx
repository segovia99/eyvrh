'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlanillaEmpleado } from '@/lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DetallePlanillaProps {
  planilla: PlanillaEmpleado;
}

export function DetallePlanilla({ planilla }: DetallePlanillaProps) {
  // Función para formatear números con separadores de miles y dos decimales
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Obtener el nombre del mes
  const getMonthName = (month: string) => {
    const date = new Date(2000, parseInt(month) - 1, 1);
    return date.toLocaleString('es-ES', { month: 'long' });
  };

  return (
    <div className="space-y-6">
      {/* Información general de la planilla */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle de Planilla</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Empleado</p>
              <p className="font-medium">{planilla.nombreEmpleado}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Cargo</p>
              <p className="font-medium">{planilla.cargoEmpleado}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">DUI</p>
              <p className="font-medium">{planilla.duiEmpleado}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Período</p>
              <p className="font-medium capitalize">
                {getMonthName(planilla.mes)} {planilla.anio}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ingresos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ingresos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Salario Base</TableCell>
                <TableCell className="text-right">{formatCurrency(planilla.salarioBase)}</TableCell>
              </TableRow>
              {planilla.horasEDiurnas > 0 && (
                <TableRow>
                  <TableCell>Horas Extras Diurnas</TableCell>
                  <TableCell className="text-right">{formatCurrency(planilla.horasEDiurnas)}</TableCell>
                </TableRow>
              )}
              {planilla.horasENocturnas > 0 && (
                <TableRow>
                  <TableCell>Horas Extras Nocturnas</TableCell>
                  <TableCell className="text-right">{formatCurrency(planilla.horasENocturnas)}</TableCell>
                </TableRow>
              )}
              {planilla.asuetos > 0 && (
                <TableRow>
                  <TableCell>Asuetos Trabajados</TableCell>
                  <TableCell className="text-right">{formatCurrency(planilla.asuetos)}</TableCell>
                </TableRow>
              )}
              {planilla.vacaciones > 0 && (
                <TableRow>
                  <TableCell>Vacaciones</TableCell>
                  <TableCell className="text-right">{formatCurrency(planilla.vacaciones)}</TableCell>
                </TableRow>
              )}
              <TableRow className="font-semibold">
                <TableCell>Total Devengado</TableCell>
                <TableCell className="text-right">{formatCurrency(planilla.totalDevengado)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Descuentos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Descuentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>AFP (7.25%)</TableCell>
                <TableCell className="text-right">{formatCurrency(planilla.descuetoAfp)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ISSS (3%)</TableCell>
                <TableCell className="text-right">{formatCurrency(planilla.descuentoIsss)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Renta (10%)</TableCell>
                <TableCell className="text-right">{formatCurrency(planilla.descuentoRenta)}</TableCell>
              </TableRow>
              {planilla.incapacidades > 0 && (
                <TableRow>
                  <TableCell>Incapacidades</TableCell>
                  <TableCell className="text-right">{formatCurrency(planilla.incapacidades)}</TableCell>
                </TableRow>
              )}
              {planilla.diasAusentes > 0 && (
                <TableRow>
                  <TableCell>Días Ausentes</TableCell>
                  <TableCell className="text-right">{formatCurrency(planilla.diasAusentes)}</TableCell>
                </TableRow>
              )}
              <TableRow className="font-semibold">
                <TableCell>Total Descuentos</TableCell>
                <TableCell className="text-right">{formatCurrency(planilla.totalDescuentos)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resumen */}
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Resumen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Devengado</p>
              <p className="text-2xl font-bold">{formatCurrency(planilla.totalDevengado)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Descuentos</p>
              <p className="text-2xl font-bold">{formatCurrency(planilla.totalDescuentos)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Líquido a Pagar</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(planilla.liquidoPagar)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
