"use client";

import Layout from "@/components/layout";
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore: sin declaración de tipos para html2pdf.js
import html2pdf from 'html2pdf.js';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

interface Planilla {
  id: string;
  nombre: string;
  resumen: string;
}

export default function ReportePlanillasResumenPage() {
  const [planillas, setPlanillas] = useState<Planilla[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simular fetch de planillas
    setPlanillas([
      { id: 'nomina-06-2025', nombre: 'Nómina Jun 2025', resumen: 'Total empleados: 25. Monto total: $18,500.' },
      { id: 'aguinaldo-2024', nombre: 'Aguinaldo 2024', resumen: 'Total empleados: 25. Monto total: $12,500.' },
      { id: 'vacaciones-2025', nombre: 'Vacaciones 2025', resumen: 'Total empleados: 10. Monto total: $3,200.' }
    ]);
  }, []);

  const handleGeneratePdf = () => {
    if (reportRef.current) {
      html2pdf()
        .from(reportRef.current)
        .set({ margin: 10, filename: `resumen_${selectedId}.pdf`, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4' } })
        .save();
    }
  };

  const selectedPlanilla = planillas.find(p => p.id === selectedId);

  return (
    <Layout title="Resumen de Planillas">
      <Card className="w-full max-w-[700px] bg-white">
        <CardHeader>
          <CardTitle className="text-teal-800">Resumen de Planillas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Select onValueChange={setSelectedId} value={selectedId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una planilla" />
              </SelectTrigger>
              <SelectContent>
                {planillas.map(planilla => (
                  <SelectItem key={planilla.id} value={planilla.id}>
                    {planilla.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPlanilla && (
            <div ref={reportRef} className="p-4 border rounded">
              <h2 className="text-lg font-semibold mb-2">{selectedPlanilla.nombre}</h2>
              <p>{selectedPlanilla.resumen}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleGeneratePdf} disabled={!selectedPlanilla} className="bg-teal-800 hover:bg-teal-700" >
            <FileText className="mr-2 h-4 w-4" />
            Generar PDF
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
}
