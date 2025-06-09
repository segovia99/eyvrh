import TableEmployees from "@/components/empleados/table-employees";
import Layout from "@/components/layout";

import { getUsers } from "@/lib/api";
import { Empleado } from "@/types/empleados";


export default async function ListaEmpleadosPage() {
  const empleados: Empleado[] = await getUsers();

 
  return (
    <Layout title="Lista de Empleados">
      <TableEmployees empleados={empleados} />
    </Layout>
  );
}
