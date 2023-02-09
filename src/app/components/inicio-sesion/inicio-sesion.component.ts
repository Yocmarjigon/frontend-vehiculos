import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  email: string = '';
  password: string = '';
  rol: string = '';

  activarNav: boolean = false

  constructor(
    private fb: FormBuilder,
    private usuarioServices: UsuariosService,
    private toastr: ToastrService,
    private router: Router,
    private activarServices: ActivarPanelService
  ) {}

  ngOnInit(): void {}

  iniciarSesion = () => {
    if (this.email == '' || this.password == '' || this.rol == '') {
      this.toastr.error('Todos los campos son obligatorios', 'ERROR');
      return
    }

    const usuario: Usuario = {
      email: this.email,
      password: this.password,
      rol: this.rol,
    };
    this.usuarioServices.iniciarSesion(usuario).subscribe({
      next: (datos) => {
        this.router.navigate(['/inicio'])
        const token = datos.toString()
        this.activarServices.$panelNav.emit(true)
        localStorage.setItem('token', token)},
      error:(error: HttpErrorResponse) =>{console.log(error.error)
    }});

  };

}
 