"use client";

import Layout from "@/components/layout"
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore: sin declaración de tipos para html2pdf.js
import html2pdf from 'html2pdf.js';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Employee {
  id: number;
  nombre: string;
  puesto: string;
  departamento: string;
  email: string;
}

const EmpleadosReportPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/empleados')
      .then(res => res.json())
      .then((data: Employee[]) => setEmployees(data))
      .catch(err => console.error('Error fetching empleados:', err));
  }, []);

  const handleGeneratePdf = () => {
    if (reportRef.current) {
      try {
        html2pdf()
          .from(reportRef.current)
          .set({
            margin: 10,
            filename: 'reporte_empleados.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          })
          .save();
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }
  };

  return (
    <Layout title="Reporte de Empleados">
      <Card className="w-full max-w-[700px] bg-white">
        <CardHeader>
          <CardTitle className="text-teal-800">Reporte de Empleados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div ref={reportRef}>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Nombre</th>
                  <th className="py-2 px-4 border-b">Puesto</th>
                  <th className="py-2 px-4 border-b">Departamento</th>
                  <th className="py-2 px-4 border-b">Email</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map(emp => (
                    <tr key={emp.id}>
                      <td className="py-2 px-4 border-b">{emp.id}</td>
                      <td className="py-2 px-4 border-b">{emp.nombre}</td>
                      <td className="py-2 px-4 border-b">{emp.puesto}</td>
                      <td className="py-2 px-4 border-b">{emp.departamento}</td>
                      <td className="py-2 px-4 border-b">{emp.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No hay empleados para mostrar
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleGeneratePdf}
            className="bg-teal-800 hover:bg-teal-700"
          >
            Generar PDF
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default EmpleadosReportPage;
