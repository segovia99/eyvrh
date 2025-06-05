import TableEmployees from "@/components/empleados/table-employees";
import Layout from "@/components/layout";

import { getUsers } from "@/lib/api";
import { Empleado } from "@/types/empleados";


// Datos de ejemplo para la tabla
// const empleados = [
//   {
//     id: 1,
//     nombre: "Ana María López",
//     documento: "12345678",
//     departamento: "Recursos Humanos",
//     cargo: "Gerente de RRHH",
//     email: "ana.lopez@eyv.com",
//     telefono: "555-1234",
//   },
//   {
//     id: 2,
//     nombre: "Carlos Rodríguez",
//     documento: "87654321",
//     departamento: "Tecnología",
//     cargo: "Desarrollador Senior",
//     email: "carlos.rodriguez@eyv.com",
//     telefono: "555-5678",
//   },
//   {
//     id: 3,
//     nombre: "Sofía Martínez",
//     documento: "23456789",
//     departamento: "Ventas",
//     cargo: "Ejecutiva de Ventas",
//     email: "sofia.martinez@eyv.com",
//     telefono: "555-9012",
//   },
//   {
//     id: 4,
//     nombre: "Javier Morales",
//     documento: "98765432",
//     departamento: "Administración",
//     cargo: "Contador",
//     email: "javier.morales@eyv.com",
//     telefono: "555-3456",
//   },
//   {
//     id: 5,
//     nombre: "Valentina Torres",
//     documento: "34567890",
//     departamento: "Producción",
//     cargo: "Supervisora",
//     email: "valentina.torres@eyv.com",
//     telefono: "555-7890",
//   },
// ]

export default async function ListaEmpleadosPage() {
  const empleados: Empleado[] = await getUsers();

 
  return (
    <Layout title="Lista de Empleados">
      <TableEmployees empleados={empleados} />
    </Layout>
  );
}
