'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calcularPlanillaEmpleado, PlanillaEmpleado } from '@/lib/api';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

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

const anios = [
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

const formSchema = z.object({
  mes: z.string({
    required_error: "Por favor seleccione un mes",
  }),
  anio: z.string({
    required_error: "Por favor seleccione un año",
  }),
});

type CalcularPlanillaFormValues = z.infer<typeof formSchema>;

interface CalcularPlanillaFormProps {
  empleadoId: number;
  empleadoNombre: string;
  onCalculated?: (planilla: PlanillaEmpleado) => void;
  onCancel?: () => void;
}

export function CalcularPlanillaForm({ empleadoId, empleadoNombre, onCalculated, onCancel }: CalcularPlanillaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<CalcularPlanillaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mes: new Date().getMonth().toString().padStart(2, '0'),
      anio: new Date().getFullYear().toString(),
    }
  });

  const onSubmit = async (data: CalcularPlanillaFormValues) => {
    try {
      setLoading(true);
      const planilla = await calcularPlanillaEmpleado(empleadoId, data.mes, data.anio);
      
      toast.success('Planilla calculada correctamente');
      
      if (onCalculated) {
        onCalculated(planilla);
      }
      
      // Recargar la página para ver los cambios
      router.refresh();
    } catch (error) {
      console.error('Error al calcular la planilla:', error);
      toast.error('Error al calcular la planilla. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Calcular Planilla</CardTitle>
        <CardDescription>
          Calcular planilla para {empleadoNombre}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mes</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un mes" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {meses.map((mes) => (
                          <SelectItem key={mes.value} value={mes.value}>
                            {mes.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="anio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un año" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {anios.map((anio) => (
                          <SelectItem key={anio.value} value={anio.value}>
                            {anio.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {loading ? 'Calculando...' : 'Calcular Planilla'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
