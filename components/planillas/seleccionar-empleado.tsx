"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUsers } from "@/lib/api";
import { User } from "lucide-react";

export interface Empleado {
  id: number;
  nombre: string;
  cargo: string;
  dui: string;
  salario: string;
}

interface SeleccionarEmpleadoProps {
  onSeleccionar: (empleado: { id: number; nombre: string }) => void;
  onCancel: () => void;
}

export function SeleccionarEmpleado({ onSeleccionar, onCancel }: SeleccionarEmpleadoProps) {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<string>("");
  const [cargando, setCargando] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    const cargarEmpleados = async () => {
      try {
        setCargando(true);
        const data = await getUsers();
        setEmpleados(data);
      } catch (error) {
        console.error('Error al cargar empleados:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarEmpleados();
  }, []);

  // Filtrar empleados basado en la búsqueda
  const empleadosFiltrados = empleados.filter(empleado =>
    empleado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    empleado.dui.includes(busqueda)
  );

  const handleSeleccionar = () => {
    const empleado = empleados.find(e => e.id === Number(empleadoSeleccionado));
    if (empleado) {
      onSeleccionar({
        id: empleado.id,
        nombre: empleado.nombre
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Seleccionar Empleado</CardTitle>
        <CardDescription>
          Busque y seleccione un empleado para calcular su planilla
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="buscar">Buscar empleado</Label>
          <Input
            id="buscar"
            placeholder="Buscar por nombre o DUI..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Seleccione un empleado</Label>
          <Select 
            value={empleadoSeleccionado} 
            onValueChange={setEmpleadoSeleccionado}
            disabled={cargando}
          >
            <SelectTrigger>
              <SelectValue placeholder={cargando ? "Cargando empleados..." : "Seleccione un empleado"} />
            </SelectTrigger>
            <SelectContent>
              {empleadosFiltrados.length > 0 ? (
                empleadosFiltrados.map((empleado) => (
                  <SelectItem key={empleado.id} value={empleado.id.toString()}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{empleado.nombre}</span>
                      <span className="text-muted-foreground text-sm">({empleado.dui})</span>
                    </div>
                  </SelectItem>
                ))
              ) : (
                <div className="py-2 px-3 text-sm text-muted-foreground">
                  {cargando ? 'Cargando...' : 'No se encontraron empleados'}
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSeleccionar}
          disabled={!empleadoSeleccionado || cargando}
        >
          Seleccionar
        </Button>
      </CardFooter>
    </Card>
  );
}
