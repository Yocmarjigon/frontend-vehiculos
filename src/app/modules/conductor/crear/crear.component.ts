import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { ToastrService } from 'ngx-toastr';
import { Conductor } from '../../../models/Conductor';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Route } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {
  id_usuarios = '';
  cedula = '';
  email = '';
  nombre_apellido = '';
  licencia = '';
  categoria = '';
  pdf_licencia!:File;
  licencia_exp = '';
  licencia_venc = '';
  password = '';
  passwordRepetida = ''
  

  usuarios: Usuario[] = [];
  fileTamp:any;
  

  @ViewChild('asCrearConductor', { static: true }) activar!: ElementRef;

  constructor(
    private activarServices: ActivarPanelService,
    private conductorServices: ConductorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activarServices.$enviarId.subscribe(id => this.id_usuarios = id)
    

  }

  decodeJwt() {
    try {
      const token = localStorage.getItem('token');
      const tokenDecode: any = jwtDecode(token!);
      const id = tokenDecode.id
      return id
    } catch (error) {
      console.log('Error decode jwt' +error);
    }
  }
  capturaPdf($event:any){
   

    const [file] = $event.target.files
    this.fileTamp ={
      fileRaw: file,
      fileName: file.name
    }
  }

  crearConductor() {

    
    console.log(this.cedula,
    this.nombre_apellido ,
    this.licencia ,
    this.licencia_exp, 
    this.licencia_venc,);
    const body = new FormData()
    console.log()
    

    if (
      this.cedula == '' ||
      this.nombre_apellido == '' ||
      this.licencia == '' ||
      this.licencia_exp == '' ||
      this.licencia_venc == '' 
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'ERROR');
      return;
    }
    if(this.password != this.passwordRepetida){
      this.toastr.error('Las passwords no son iguales', 'ERROR');
      return;
    }


    const licencia_venc = new Date(this.licencia_venc);
    const licencia_exp = new Date(this.licencia_exp);

    const conductor: Conductor = {
      id_usuarios: this.decodeJwt(),
      cedula: this.cedula,
      email: this.email,
      nombre_apellido: this.nombre_apellido,
      password: this.password,
      licencia: this.licencia,
      licencia_exp: licencia_exp,
      licencia_venc: licencia_venc,
      categoria: this.categoria,
    };
    body.append('licencia_pdf', this.fileTamp.fileRaw, this.fileTamp.fileName)
    console.log(this.fileTamp)

    this.conductorServices.enviarpdf(body).subscribe(res => console.log(res))
    
    this.conductorServices.crearConductor(conductor).subscribe({
      next: () => {
        this.toastr.success('Conductor creado correctamente', 'CORRECTO'); window.location.reload()},
      error: (error: HttpErrorResponse) => {
        this.toastr.error(`${error}`, 'ERROR');
      },
    });
  }

  cerrarPanel() {
    this.activarServices.$activarPanelCrear.emit(false);
  }
}
