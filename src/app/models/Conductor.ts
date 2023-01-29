export interface Conductor {
    id_conductor?: string;
    id_usuario?: string;
    cedula?: string;
    nombre_apellido?: string;
    licencia?: string;
    licencia_exp?: Date;
    licencia_venc?: Date;
    estado: number;
    categoria?: string

}