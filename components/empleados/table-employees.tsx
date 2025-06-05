"use client";

import { Empleado } from "@/types/empleados";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Trash2, UserPlus } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { deleteUser } from "@/lib/api";

export default function TableEmployees({
  empleados,
}: {
  empleados: Empleado[];
}) {
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este empleado?",
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminando...",
          text: "Por favor espera",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading(); // Muestra animación de loading
          },
        });
        try {
          await deleteUser(id);
          Swal.fire("Empleado eliminado exitosamente", "", "success");
        } catch (error) {
          Swal.fire("Error al eliminar empleado", "", "error");
        }
      }
    });
  };
  return (
    <Card className="w-full max-w-[1080px] bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-teal-800">
          Empleados Registrados
        </h2>
        <Button className="bg-teal-800 hover:bg-teal-700" asChild>
          <Link href="/empleados/agregar">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Empleado
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>DUI</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell className="font-medium">{empleado.nombre}</TableCell>
                <TableCell>{empleado.dui}</TableCell>
                <TableCell>{empleado.email}</TableCell>
                <TableCell>{empleado.cargo}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(empleado.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/empleados/perfil/${empleado.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
