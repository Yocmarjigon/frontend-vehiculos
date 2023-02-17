import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../../models/Usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  fgValidacion: FormGroup = this.fb.group({
    id_usuarios: [''],
    nombre_apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]+$") ]],
    password: ['', [Validators.required, Validators.minLength(8) ]],
    repetirPassword: ['', [Validators.required]],
    rol: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private usuarioServices: UsuariosService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  creaUsuario() {
    if (
      this.fgValidacion.controls['nombre_apellido'].value === '' ||
      this.fgValidacion.controls['email'].value === '' ||
      this.fgValidacion.controls['telefono'].value === '' ||
      this.fgValidacion.controls['password'].value === ''
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    if (this.fgValidacion.controls['password'].value != this.fgValidacion.controls['repetirPassword'].value) {
      this.toastr.error('Las password son diferentes', 'Error');
      return;
    }

    const usuario = new Usuario()
    usuario.nombre_apellido = this.fgValidacion.controls['nombre_apellido'].value
    usuario.email = this.fgValidacion.controls['email'].value
    usuario.telefono = this.fgValidacion.controls['telefono'].value
    usuario.password = this.fgValidacion.controls['password'].value
    usuario.rol = 'admin'

    this.usuarioServices.registrarUsuarios(usuario).subscribe({
      next: () => {
        this.toastr.success('El usuario fue creado correctamente', 'OK'),
          this.router.navigate(['/iniciar-sesion']);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(`${error}`), console.log(error);
      },
    });
  }
}
