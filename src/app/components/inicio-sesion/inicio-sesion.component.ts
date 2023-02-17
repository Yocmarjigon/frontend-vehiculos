import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosModule } from 'src/app/modules/usuarios/usuarios.module';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {Usuario} from '../../models/Usuario'
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rol: ['', [Validators.required]]
  })


  

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
    if (this.fgValidacion.controls['email'].value == '' || this.fgValidacion.controls['password'].value == '' || this.fgValidacion.controls['rol'].value == '') {
      this.toastr.error('Todos los campos son obligatorios', 'ERROR');
      return
    }

    const usuario = new Usuario()
    usuario.email = this.fgValidacion.controls['email'].value
    usuario.password = this.fgValidacion.controls['password'].value
    usuario.rol = this.fgValidacion.controls['rol'].value

    
    this.usuarioServices.iniciarSesion(usuario).subscribe({
      next: (datos) => {
        this.router.navigate(['/inicio'])
        const token = datos.toString()
        this.activarServices.$panelNav.emit(true)
        localStorage.setItem('token', token)},
      error:(error: HttpErrorResponse) =>{console.log(error)
    }});

  };

}
 