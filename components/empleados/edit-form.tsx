"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Employee, employeeSchema } from "@/validations/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  MapPin,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, set } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateEmpleado } from "@/lib/api";

export default function EditEmpleadoForm({ empleado }: { empleado: Employee }) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      nombre: empleado.nombre,
      email: empleado.email,
      password: empleado.password,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
      edad: empleado.edad,
      dui: empleado.dui,
      cuenta_planillera: "0",
      cargo: empleado.cargo,
      fecha_ingreso: empleado.fecha_ingreso,
      salario: empleado.salario,
      salario_neto: empleado.salario_neto,
      horas: 0,
      estado: "Activo",
      sexo: empleado.sexo,
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
    console.log(values);
    setIsEditing(false);
    try {
      //@ts-ignore
      await updateEmpleado(empleado.id, values);
      toast.success("Empleado actualizado exitosamente");
      router.push("/empleados");
    } catch (error) {
      toast.error("Error al actualizar empleado");
    }
    console.log(values);
  }

  const onError = (errors: any) => {
    console.log("❌ Errores del formulario:", errors);
  };

  const parseDate = (str: string): Date | null => {
    const [day, month, year] = str.split("/");
    if (!day || !month || !year) return null;
    return new Date(+year, +month - 1, +day);
  };

  return (
    <Card className="w-full max-w-[900px] bg-white">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-teal-800">
            {empleado.nombre}
          </CardTitle>
          <p className="text-gray-500 mt-1">{empleado.cargo}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/empleados">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          {!isEditing && (
            <Button
              className="bg-teal-800 hover:bg-teal-700"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="informacion">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="informacion">Información Personal</TabsTrigger>
            <TabsTrigger value="laboral">Información Laboral</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <TabsContent value="informacion" className="space-y-6 mt-6">
                <div className="flex items-center justify-center gap-6">
                  <div className="w-2/3 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">
                        <User className="h-4 w-4 inline mr-2" />
                        Nombre Completo
                      </Label>
                      {isEditing ? (
                        <FormField
                          control={form.control}
                          name="nombre"
                          render={({ field }) => (
                            <div className="space-y-2">
                              <FormItem>
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
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.nombre}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documento">
                        <Briefcase className="h-4 w-4 inline mr-2" />
                        Documento de Identidad
                      </Label>
                      {isEditing ? (
                        <FormField
                          control={form.control}
                          name="dui"
                          render={({ field }) => (
                            <div className="space-y-2">
                              <FormItem>
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
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.dui}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Correo Electrónico
                      </Label>
                      {isEditing ? (
                        <FormField
                          control={form.control}
                          name="email"
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
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Teléfono
                      </Label>
                      {isEditing ? (
                        <FormField
                          control={form.control}
                          name="telefono"
                          render={({ field }) => (
                            <div className="space-y-2">
                              <FormItem>
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
                      ) : (
                        <p className="text-gray-700 pt-1">
                          {empleado.telefono}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fechaNacimiento">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Fecha de Nacimiento
                      </Label>
                      {isEditing ? (
                        <FormField
                          control={form.control}
                          name="edad"
                          render={({ field }) => (
                            <div className="space-y-2">
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="date"
                                    placeholder="Ingrese el correo electrónico"
                                    value={
                                      field.value
                                        ? format(
                                            parseDate(field.value) ||
                                              new Date(),
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
                      ) : (
                        <p className="text-gray-700 pt-1">
                          {new Date(empleado.edad).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genero">
                        <User className="h-4 w-4 inline mr-2" />
                        Género
                      </Label>
                      {isEditing ? (
                        <FormField
                    control={form.control}
                    name="sexo"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el genero" />
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
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.sexo}</p>
                      )}
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="direccion">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        Dirección
                      </Label>
                      {isEditing ? (
                       <FormField
                          control={form.control}
                          name="direccion"
                          render={({ field }) => (
                            <div className="space-y-2">
                              <FormItem>
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
                      ) : (
                        <p className="text-gray-700 pt-1">
                          {empleado.direccion}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="laboral" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cargo">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Cargo
                    </Label>
                    {isEditing ? (
                      <FormField
                          control={form.control}
                          name="cargo"
                          render={({ field }) => (
                            <div className="space-y-2">
                              <FormItem>
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
                    ) : (
                      <p className="text-gray-700 pt-1">{empleado.cargo}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fechaContratacion">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Fecha de Contratación
                    </Label>
                    {isEditing ? (
                      <FormField
                    control={form.control}
                    name="fecha_ingreso"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormItem>
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
                    ) : (
                      <p className="text-gray-700 pt-1">
                        {new Date(empleado.fecha_ingreso).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salario">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Salario
                    </Label>
                    {isEditing ? (
                      <FormField
                          control={form.control}
                          name="salario"
                          render={({ field }) => (
                            <div className="space-y-2">
                              <FormItem>
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
                    ) : (
                      <p className="text-gray-700 pt-1">${empleado.salario}</p>
                      // <p className="text-gray-700 pt-1">$12</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              {isEditing && (
                <CardFooter className="flex justify-end gap-2 mt-6 px-0">
                  <Button
                    variant="outline"
                    type="submit"
                    // onClick={() => {
                    //   // setFormData(empleado);
                    //   setIsEditing(false);
                    // }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-teal-800 hover:bg-teal-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                </CardFooter>
              )}
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
