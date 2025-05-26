"use client";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { employeeSchema } from "@/validations/employee";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { createUser } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AgregarEmpleadoPage() {
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      nombre: "",
      email: "",
      password: "12345678",
      telefono: "",
      direccion: "",
      edad: "",
      dui: "",
      cuenta_planillera: "0",
      cargo: "",
      fecha_ingreso: "",
      salario: "",
      salario_neto: "0",
      horas: 0,
      estado: "Activo",
      sexo: "",
      dias_descontados: 0,
      roles: [
        {
          name: "ADMIN",
        },
      ],
      horasNocturnas: {
        enero: 0,
        febrero: 0,
        marzo: 0,
        abril: 0,
        mayo: 0,
        junio: 0,
        julio: 0,
        agosto: 0,
        septiembre: 0,
        octubre: 0,
        noviembre: 0,
        diciembre: 0,
      },

      horasDiurnas: {
        enero: 0,
        febrero: 0,
        marzo: 0,
        abril: 0,
        mayo: 0,
        junio: 0,
        julio: 0,
        agosto: 0,
        septiembre: 0,
        octubre: 0,
        noviembre: 0,
        diciembre: 0,
      },
    },
  });

  const {
    setValue,
    formState: { isLoading },
  } = form;
 

  const router = useRouter();
  
  async function onSubmit(values: z.infer<typeof employeeSchema>) {
    try {
      await createUser(values);
      toast.success("Empleado creado exitosamente");
      router.push("/empleados");
    } catch (error) {
      toast.error("Error al crear empleado");
    }
    // console.log(values);
  }

  // const onError = (errors: any) => {
  //   console.log("❌ Errores del formulario:", errors);
  // };

  const formatDui = (value: string): string => {
    const digits = value.replace(/\D/g, ""); // Elimina todo lo que no sea número
    if (digits.length <= 8) return digits;
    return digits.slice(0, 8) + "-" + digits.slice(8, 9);
  };

  // Función para convertir "dd/MM/yyyy" a Date
  const parseDate = (str: string): Date | null => {
    const [day, month, year] = str.split("/");
    if (!day || !month || !year) return null;
    return new Date(+year, +month - 1, +day);
  };

  return (
    <Layout title="Agregar Empleado">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[760px]"
        >
          <Card className="w-full max-w-[760px] bg-white">
            <CardHeader>
              <CardTitle className="text-teal-800">
                Información del Empleado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder="Ingrese nombre completo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="edad"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
                          <FormLabel>Fecha de nacimiento</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              placeholder="Ingrese el correo electrónico"
                              value={
                                field.value
                                  ? format(
                                      parseDate(field.value) || new Date(),
                                      "yyyy-MM-dd"
                                    )
                                  : ""
                              }
                              onChange={(e) => {
                                const rawDate = e.target.value; // "1999-05-09"
                                const formatted = format(
                                  new Date(rawDate),
                                  "dd/MM/yyyy"
                                ); // "09/05/1999"
                                setValue("edad", formatted);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="sexo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sexo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el sexo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Masculino">Masculino</SelectItem>
                            <SelectItem value="Femenino">Femenino</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="dui"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
                          <FormLabel>DUI</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingrese el numéro de documento"
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                const formatted = formatDui(e.target.value);
                                field.onChange(formatted);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
                          <FormLabel>Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingrese el correo electrónico"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingrese número de teléfono"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Input placeholder="Ingrese dirección" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="cargo"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
                          <FormLabel>Cargo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ingrese el cargo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="salario"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
                          <FormLabel>Salario</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ingrese el salario"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="fecha_ingreso"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
                          <FormLabel>Fecha de ingreso</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              placeholder="Ingrese la fecha de ingreso"
                              value={
                                field.value
                                  ? format(
                                      parseDate(field.value) || new Date(),
                                      "yyyy-MM-dd"
                                    )
                                  : ""
                              }
                              onChange={(e) => {
                                const rawDate = e.target.value; // "1999-05-09"
                                const formatted = format(
                                  new Date(rawDate),
                                  "dd/MM/yyyy"
                                ); // "09/05/1999"
                                setValue("fecha_ingreso", formatted);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/empleados">Cancelar</Link>
              </Button>
              {isLoading ? (
                <Button
                  type="submit"
                  className="bg-teal-800 hover:bg-teal-700"
                  disabled
                >
                  <Loader2 className="animate-spin" />
                  Guardando...
                </Button>
              ) : (
                <Button type="submit" className="bg-teal-800 hover:bg-teal-700">
                  Guardar
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </Layout>
  );
}
