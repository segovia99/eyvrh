import EditEmpleadoForm from "@/components/empleados/edit-form";
import Layout from "@/components/layout";
import { getuser } from "@/lib/api";

type Props = {
  params: {
    id: string;
  };
}

export default async function PerfilEmpleadoPage({ params }: Props) {

  const id = Number(params.id) || 1;
  const empleado = await getuser(id);

  if (!empleado) {
    return (
      <Layout title="Cargando...">
        <div className="flex justify-center items-center h-64">
          <p>Cargando información del empleado...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Perfil de Empleado">
      {/* @ts-ignore */}
      <EditEmpleadoForm empleado={empleado} />
    </Layout>
  );
}
