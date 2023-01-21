import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../../models/Usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
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
      nombre_apellido: this.nombre_apellido,
      email: this.email,
      telefono: this.telefono,
      password: this.password,
      rol: this.rol
    }

    this.usuarioServices.registrarUsuarios(usuario).subscribe(u => {
      this.toastr.success('El usuario fue creado correctamente', 'OK')
      this.router.navigate(['/iniciar-sesion'])
    })

    console.log(usuario)

  }
}
