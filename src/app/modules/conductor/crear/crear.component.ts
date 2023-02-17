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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {
  fgValidacion: FormGroup = this.fg.group({
    id_usuarios: [''],
    cedula: ['', [Validators.required]],
    email: ['',  [Validators.required, Validators.email]],
    nombre_apellido: ['',  [Validators.required]],
    licencia: ['',  [Validators.required]],
    categoria: ['',  [Validators.required]],
    pdf_licencia: ['', [Validators.required]],
    licencia_exp: ['',  [Validators.required]],
    licencia_venc: ['',  [Validators.required]],
    password: ['',  [Validators.required, Validators.minLength(8)]],
    passwordRepetida: ['',  [Validators.required]],
  });

  usuarios: Usuario[] = [];
  fileTamp: any;

  @ViewChild('asCrearConductor', { static: true }) activar!: ElementRef;

  constructor(
    private activarServices: ActivarPanelService,
    private conductorServices: ConductorService,
    private toastr: ToastrService,
    private fg: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  decodeJwt() {
    try {
      const token = localStorage.getItem('token');
      const tokenDecode: any = jwtDecode(token!);
      const id = tokenDecode.id;
      return id;
    } catch (error) {
      console.log('Error decode jwt' + error);
    }
  }
  capturaPdf($event: any) {
    const [file] = $event.target.files;
    this.fileTamp = {
      fileRaw: file,
      fileName: file.name,
    };
  }

  crearConductor() {
    const body = new FormData();

    if (
      this.fgValidacion.controls['cedula'].value == '' ||
      this.fgValidacion.controls['nombre_apellido'].value == '' ||
      this.fgValidacion.controls['licencia'].value == '' ||
      this.fgValidacion.controls['licencia_exp'].value == '' ||
      this.fgValidacion.controls['licencia_venc'].value == ''
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'ERROR');
      return;
    }
    if (
      this.fgValidacion.controls['password'].value !=
      this.fgValidacion.controls['passwordRepetida'].value
    ) {
      this.toastr.error('Las passwords no son iguales', 'ERROR');
      return;
    }

    const licencia_venc = new Date(
      this.fgValidacion.controls['licencia_venc'].value
    );
    const licencia_exp = new Date(
      this.fgValidacion.controls['licencia_exp'].value
    );

    const conductor = new Conductor();
    conductor.id_usuarios = this.decodeJwt(),
    conductor.cedula = this.fgValidacion.controls['cedula'].value;
    conductor.nombre_apellido = this.fgValidacion.controls['nombre_apellido'].value;
    conductor.email = this.fgValidacion.controls['email'].value;
    conductor.licencia = this.fgValidacion.controls['licencia'].value;
    conductor.categoria = this.fgValidacion.controls['categoria'].value;
    conductor.licencia_exp = licencia_exp;
    conductor.licencia_venc = licencia_venc;
    conductor.password = this.fgValidacion.controls['password'].value;

    body.append('licencia_pdf', this.fileTamp.fileRaw, this.fileTamp.fileName);
    console.log(this.fileTamp);

    this.conductorServices.enviarpdf(body).subscribe((res) => console.log(res));

    this.conductorServices.crearConductor(conductor).subscribe({
      next: () => {
        this.toastr.success('Conductor creado correctamente', 'CORRECTO');
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(`${error}`, 'ERROR');
      },
    });
  }

  cerrarPanel() {
    this.activarServices.$activarPanelCrear.emit(false);
  }
}
