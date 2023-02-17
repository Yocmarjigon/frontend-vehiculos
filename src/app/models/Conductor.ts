export class Conductor {
    id_conductor?: number;
    id_usuarios?: string;
    cedula?: string;
    email?: string;
    nombre_apellido?: string;
    password?: string;
    licencia?: string;
    pdf_licencia?:string;
    licencia_exp?: Date;
    licencia_venc?: Date;
    estado?: number[];
    categoria?: string;
    rol?: string;

}