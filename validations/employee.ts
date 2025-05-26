import { z } from "zod";

export const employeeSchema = z.object({
  nombre: z.string().min(5, "Ingrese el nombre del empleado"),
  email: z.string().email("Ingrese un email valido"),
  password: z.string().min(6, "Ingrese una contraseña valida"),
  telefono: z.string().length(8, "Ingrese un telefono valido"),
  direccion: z.string().min(5, "Ingrese una direccion valida"),
  edad: z.string().min(1, "Selecione la fecha de nacimiento"),
  dui: z
    .string()
    .refine((val) => /^\d{8}-\d{1}$/.test(val), {
      message: 'El DUI debe tener el formato 12345678-9',
    }),
  cargo: z.string().min(1, "Ingrese un cargo valido"),
  salario: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Debe ser un número válido",
    })
    .refine((val) => val > 0, {
      message: "El salario debe ser mayor a 0",
    }).transform((val) => (val).toString()),
  sexo: z.string().min(1, "Selecione el sexo"),
  cuenta_planillera: z.string().min(1, "Selecione la cuenta planillera"),
  fecha_ingreso: z.string().min(1, "Selecione la fecha de ingreso"),
  dias_descontados: z.number().min(0, "Selecione los dias descontados"),
  horas: z.number().min(0, "Selecione las horas"),
  salario_neto: z.string().min(1, "Selecione el salario neto"),
  estado: z.string().min(1, "Selecione el estado"),
  roles: z.array(z.object({
    name: z.string().min(1, "Selecione el rol"),
  })),
  horasNocturnas: z.object({
    enero: z.number().min(0, "Selecione las horas nocturnas"),
    febrero: z.number().min(0, "Selecione las horas nocturnas"),
    marzo: z.number().min(0, "Selecione las horas nocturnas"),
    abril: z.number().min(0, "Selecione las horas nocturnas"),
    mayo: z.number().min(0, "Selecione las horas nocturnas"),
    junio: z.number().min(0, "Selecione las horas nocturnas"),
    julio: z.number().min(0, "Selecione las horas nocturnas"),
    agosto: z.number().min(0, "Selecione las horas nocturnas"),
    septiembre: z.number().min(0, "Selecione las horas nocturnas"),
    octubre: z.number().min(0, "Selecione las horas nocturnas"),
    noviembre: z.number().min(0, "Selecione las horas nocturnas"),
    diciembre: z.number().min(0, "Selecione las horas nocturnas"),
  }),

  horasDiurnas: z.object({
    enero: z.number().min(0, "Selecione las horas diurnas"),
    febrero: z.number().min(0, "Selecione las horas diurnas"),
    marzo: z.number().min(0, "Selecione las horas diurnas"),
    abril: z.number().min(0, "Selecione las horas diurnas"),
    mayo: z.number().min(0, "Selecione las horas diurnas"),
    junio: z.number().min(0, "Selecione las horas diurnas"),
    julio: z.number().min(0, "Selecione las horas diurnas"),
    agosto: z.number().min(0, "Selecione las horas diurnas"),
    septiembre: z.number().min(0, "Selecione las horas diurnas"),
    octubre: z.number().min(0, "Selecione las horas diurnas"),
    noviembre: z.number().min(0, "Selecione las horas diurnas"),
    diciembre: z.number().min(0, "Selecione las horas diurnas"),
  }),

  
});

export type Employee = z.infer<typeof employeeSchema>;