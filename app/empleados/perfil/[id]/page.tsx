"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, User, Mail, Phone, Briefcase, Building, Calendar, MapPin, Edit } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para los empleados
const empleadosData = [
  {
    id: 1,
    nombre: "Ana María López",
    documento: "12345678",
    departamento: "Recursos Humanos",
    cargo: "Gerente de RRHH",
    email: "ana.lopez@eyv.com",
    telefono: "555-1234",
    fechaNacimiento: "1985-06-15",
    fechaContratacion: "2018-03-10",
    direccion: "Av. Principal 123, Ciudad",
    genero: "Femenino",
    estadoCivil: "Casada",
    educacion: "Maestría en Administración de Empresas",
    emergenciaContacto: "Juan López - 555-9876",
    salario: 3500,
    tipoContrato: "Indefinido",
    horario: "Lunes a Viernes, 8:00 - 17:00",
    vacacionesDisponibles: 15,
    foto: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    documento: "87654321",
    departamento: "Tecnología",
    cargo: "Desarrollador Senior",
    email: "carlos.rodriguez@eyv.com",
    telefono: "555-5678",
    fechaNacimiento: "1990-11-22",
    fechaContratacion: "2019-07-15",
    direccion: "Calle Secundaria 456, Ciudad",
    genero: "Masculino",
    estadoCivil: "Soltero",
    educacion: "Ingeniería en Sistemas",
    emergenciaContacto: "María Rodríguez - 555-4321",
    salario: 2800,
    tipoContrato: "Indefinido",
    horario: "Lunes a Viernes, 9:00 - 18:00",
    vacacionesDisponibles: 12,
    foto: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 3,
    nombre: "Sofía Martínez",
    documento: "23456789",
    departamento: "Ventas",
    cargo: "Ejecutiva de Ventas",
    email: "sofia.martinez@eyv.com",
    telefono: "555-9012",
    fechaNacimiento: "1988-04-30",
    fechaContratacion: "2020-01-20",
    direccion: "Plaza Central 789, Ciudad",
    genero: "Femenino",
    estadoCivil: "Divorciada",
    educacion: "Licenciatura en Marketing",
    emergenciaContacto: "Pedro Martínez - 555-6789",
    salario: 2200,
    tipoContrato: "Indefinido",
    horario: "Lunes a Viernes, 8:30 - 17:30",
    vacacionesDisponibles: 10,
    foto: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 4,
    nombre: "Javier Morales",
    documento: "98765432",
    departamento: "Administración",
    cargo: "Contador",
    email: "javier.morales@eyv.com",
    telefono: "555-3456",
    fechaNacimiento: "1982-09-05",
    fechaContratacion: "2017-11-01",
    direccion: "Avenida Norte 321, Ciudad",
    genero: "Masculino",
    estadoCivil: "Casado",
    educacion: "Licenciatura en Contabilidad",
    emergenciaContacto: "Laura Morales - 555-8765",
    salario: 2500,
    tipoContrato: "Indefinido",
    horario: "Lunes a Viernes, 8:00 - 17:00",
    vacacionesDisponibles: 18,
    foto: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 5,
    nombre: "Valentina Torres",
    documento: "34567890",
    departamento: "Producción",
    cargo: "Supervisora",
    email: "valentina.torres@eyv.com",
    telefono: "555-7890",
    fechaNacimiento: "1986-12-10",
    fechaContratacion: "2019-03-15",
    direccion: "Calle Sur 654, Ciudad",
    genero: "Femenino",
    estadoCivil: "Soltera",
    educacion: "Ingeniería Industrial",
    emergenciaContacto: "Roberto Torres - 555-2345",
    salario: 2300,
    tipoContrato: "Indefinido",
    horario: "Lunes a Viernes, 7:00 - 16:00",
    vacacionesDisponibles: 14,
    foto: "/placeholder.svg?height=150&width=150",
  },
]

export default function PerfilEmpleadoPage() {
  const params = useParams()
  const router = useRouter()
  const [empleado, setEmpleado] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    // En un caso real, aquí harías una petición a la API
    const id = Number(params.id)
    const empleadoEncontrado = empleadosData.find((emp) => emp.id === id)

    if (empleadoEncontrado) {
      setEmpleado(empleadoEncontrado)
      setFormData(empleadoEncontrado)
    } else {
      // Si no se encuentra el empleado, redirigir a la lista
      router.push("/empleados")
    }
  }, [params.id, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // En un caso real, aquí enviarías los datos a la API
    setEmpleado(formData)
    setIsEditing(false)
    // Mostrar mensaje de éxito
    alert("Información actualizada correctamente")
  }

  if (!empleado) {
    return (
      <Layout title="Cargando...">
        <div className="flex justify-center items-center h-64">
          <p>Cargando información del empleado...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Perfil de Empleado">
      <Card className="w-full max-w-[900px] bg-white">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-teal-800">{empleado.nombre}</CardTitle>
            <p className="text-gray-500 mt-1">
              {empleado.cargo} - {empleado.departamento}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/empleados/lista">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            {!isEditing && (
              <Button className="bg-teal-800 hover:bg-teal-700" onClick={() => setIsEditing(true)}>
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
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="informacion" className="space-y-6 mt-6">
                <div className="flex gap-6">
                  <div className="w-1/3 flex flex-col items-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                      <img
                        src={empleado.foto || "/placeholder.svg"}
                        alt={empleado.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <Button variant="outline" type="button" className="w-full">
                        Cambiar foto
                      </Button>
                    )}
                  </div>

                  <div className="w-2/3 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">
                        <User className="h-4 w-4 inline mr-2" />
                        Nombre Completo
                      </Label>
                      {isEditing ? (
                        <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.nombre}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documento">
                        <Briefcase className="h-4 w-4 inline mr-2" />
                        Documento
                      </Label>
                      {isEditing ? (
                        <Input
                          id="documento"
                          name="documento"
                          value={formData.documento}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.documento}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Correo Electrónico
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
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
                        <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} />
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.telefono}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fechaNacimiento">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Fecha de Nacimiento
                      </Label>
                      {isEditing ? (
                        <Input
                          id="fechaNacimiento"
                          name="fechaNacimiento"
                          type="date"
                          value={formData.fechaNacimiento}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-700 pt-1">{new Date(empleado.fechaNacimiento).toLocaleDateString()}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genero">
                        <User className="h-4 w-4 inline mr-2" />
                        Género
                      </Label>
                      {isEditing ? (
                        <Select value={formData.genero} onValueChange={(value) => handleSelectChange("genero", value)}>
                          <SelectTrigger id="genero">
                            <SelectValue placeholder="Seleccione género" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Masculino">Masculino</SelectItem>
                            <SelectItem value="Femenino">Femenino</SelectItem>
                            <SelectItem value="Otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.genero}</p>
                      )}
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="direccion">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        Dirección
                      </Label>
                      {isEditing ? (
                        <Input
                          id="direccion"
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.direccion}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estadoCivil">
                        <User className="h-4 w-4 inline mr-2" />
                        Estado Civil
                      </Label>
                      {isEditing ? (
                        <Select
                          value={formData.estadoCivil}
                          onValueChange={(value) => handleSelectChange("estadoCivil", value)}
                        >
                          <SelectTrigger id="estadoCivil">
                            <SelectValue placeholder="Seleccione estado civil" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Soltero">Soltero/a</SelectItem>
                            <SelectItem value="Casado">Casado/a</SelectItem>
                            <SelectItem value="Divorciado">Divorciado/a</SelectItem>
                            <SelectItem value="Viudo">Viudo/a</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.estadoCivil}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergenciaContacto">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Contacto de Emergencia
                      </Label>
                      {isEditing ? (
                        <Input
                          id="emergenciaContacto"
                          name="emergenciaContacto"
                          value={formData.emergenciaContacto}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-gray-700 pt-1">{empleado.emergenciaContacto}</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="laboral" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departamento">
                      <Building className="h-4 w-4 inline mr-2" />
                      Departamento
                    </Label>
                    {isEditing ? (
                      <Select
                        value={formData.departamento}
                        onValueChange={(value) => handleSelectChange("departamento", value)}
                      >
                        <SelectTrigger id="departamento">
                          <SelectValue placeholder="Seleccione departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Administración">Administración</SelectItem>
                          <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                          <SelectItem value="Ventas">Ventas</SelectItem>
                          <SelectItem value="Producción">Producción</SelectItem>
                          <SelectItem value="Tecnología">Tecnología</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-gray-700 pt-1">{empleado.departamento}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cargo">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Cargo
                    </Label>
                    {isEditing ? (
                      <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleInputChange} />
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
                      <Input
                        id="fechaContratacion"
                        name="fechaContratacion"
                        type="date"
                        value={formData.fechaContratacion}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-gray-700 pt-1">{new Date(empleado.fechaContratacion).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipoContrato">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Tipo de Contrato
                    </Label>
                    {isEditing ? (
                      <Select
                        value={formData.tipoContrato}
                        onValueChange={(value) => handleSelectChange("tipoContrato", value)}
                      >
                        <SelectTrigger id="tipoContrato">
                          <SelectValue placeholder="Seleccione tipo de contrato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Indefinido">Indefinido</SelectItem>
                          <SelectItem value="Temporal">Temporal</SelectItem>
                          <SelectItem value="Por Obra">Por Obra</SelectItem>
                          <SelectItem value="Prácticas">Prácticas</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-gray-700 pt-1">{empleado.tipoContrato}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salario">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Salario
                    </Label>
                    {isEditing ? (
                      <Input
                        id="salario"
                        name="salario"
                        type="number"
                        value={formData.salario}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-gray-700 pt-1">${empleado.salario.toFixed(2)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="horario">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Horario
                    </Label>
                    {isEditing ? (
                      <Input id="horario" name="horario" value={formData.horario} onChange={handleInputChange} />
                    ) : (
                      <p className="text-gray-700 pt-1">{empleado.horario}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vacacionesDisponibles">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Días de Vacaciones Disponibles
                    </Label>
                    {isEditing ? (
                      <Input
                        id="vacacionesDisponibles"
                        name="vacacionesDisponibles"
                        type="number"
                        value={formData.vacacionesDisponibles}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-gray-700 pt-1">{empleado.vacacionesDisponibles} días</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educacion">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Educación
                    </Label>
                    {isEditing ? (
                      <Input id="educacion" name="educacion" value={formData.educacion} onChange={handleInputChange} />
                    ) : (
                      <p className="text-gray-700 pt-1">{empleado.educacion}</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documentos" className="space-y-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-gray-500 mb-4">No hay documentos disponibles para este empleado.</p>
                  {isEditing && (
                    <Button variant="outline" type="button">
                      Subir Documento
                    </Button>
                  )}
                </div>
              </TabsContent>

              {isEditing && (
                <CardFooter className="flex justify-end gap-2 mt-6 px-0">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setFormData(empleado)
                      setIsEditing(false)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-teal-800 hover:bg-teal-700">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                </CardFooter>
              )}
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  )
}
