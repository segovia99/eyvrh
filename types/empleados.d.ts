export type Empleado = {
    id:                          number;
    planillaEmpleado:            PlanillaEmpleado[];
    nombre:                      string;
    email:                       string;
    password:                    string;
    telefono:                    string;
    direccion:                   string;
    edad:                        string;
    dui:                         string;
    cuenta_planillera:           string;
    cargo:                       string;
    fecha_ingreso:               string;
    salario:                     string;
    salario_neto:                string;
    estado:                      string;
    sexo:                        null;
    horasDiurnas:                { [key: string]: number };
    horasNocturnas:              { [key: string]: number };
    roles:                       Role[];
    solicitudesDiasLibres:       any[];
    incapacidadDiasUsuarios:     any[];
    asuetoTrabajadoDiasUsuarios: any[];
    cargaLaboralDiurnaUsuarios:  any[];
    extrasDiurnas:               any[];
    extrasNocturnas:             any[];
    ausenciaDiaUsuarios:         any[];
    vacacionesDiasUsuarios:      any[];
}

export type PlanillaEmpleado = {
    id:              number;
    horasEDiurnas:   number;
    horasENocturnas: number;
    nombreEmpleado:  string;
    cargoEmpleado:   string;
    duiEmpleado:     string;
    fechaInicio:     string;
    fechaFin:        string;
    salarioBase:     number;
    salarioDia:      number;
    diasLaborados:   number;
    horasAusentes:   number;
    incapacidades:   number;
    vacaciones:      number;
    asuetos:         number;
    totalDevengado:  number;
    descuetoAfp:     number;
    descuentoIsss:   number;
    descuentoRenta:  number;
    totalDescuentos: number;
    liquidoPagar:    number;
    mes:             string;
    anio:            string;
}

export type Role = {
    id:   number;
    name: string;
}