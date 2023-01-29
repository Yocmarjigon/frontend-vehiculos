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
  id_usuarios: string = '';
  nombre_apellido: string = '';
  email: string = '';
  telefono: string = '';
  password: string = '';
  rol: string = '';
 

  constructor(
    private fb: FormBuilder,
    private usuarioServices: UsuariosService,
    private toastr: ToastrService,
    private router: Router
    ){

  }

   
  creaUsuario(){

    if (this.nombre_apellido === '' || this.email === '' || this.telefono === '' || this.password === '' || this.rol === ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const usuario: Usuario ={
      id_usuarios: this.id_usuarios,
      nombre_apellido: this.nombre_apellido,
      email: this.email,
      telefono: this.telefono,
      password: this.password,
      rol: 'admin'
    }

    this.usuarioServices.registrarUsuarios(usuario).subscribe({
      next: () => {this.toastr.success('El usuario fue creado correctamente', 'OK'),
      this.router.navigate(['/iniciar-sesion'])},
      error:(error: HttpErrorResponse) =>{this.toastr.error(`${error.error.text}`), console.log(error.error.text)}
    })

    

  }
}
