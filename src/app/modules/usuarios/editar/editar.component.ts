import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  fgValidacion: FormGroup = this.fb.group({
    nombre_apellido: [''],
    email: [''],
    telefono: [''],
    password: [''],
    rol: ['']
  })

  @Input() idConductor:string = '';

  constructor(
    private usuarioServices: UsuariosService,
    private fb: FormBuilder,
    private activarServices: ActivarPanelService,
    private toastr: ToastrService
    ){
  }

  ngOnInit(): void {
    this.cargarUsuario()
  }

  cargarUsuario(){
    this.usuarioServices.obtenerUsuario(this.idConductor).subscribe(valor => {
      this.fgValidacion.controls['nombre_apellido'].setValue(valor.nombre_apellido)
      this.fgValidacion.controls['email'].setValue(valor.email)
      this.fgValidacion.controls['telefono'].setValue(valor.telefono)
      this.fgValidacion.controls['rol'].setValue(valor.rol)
    })
  }

  actualizandoUsuario(){
    const usuario = new Usuario()
    usuario.nombre_apellido = this.fgValidacion.controls['nombre_apellido'].value
    usuario.email = this.fgValidacion.controls['email'].value 
    usuario.telefono = this.fgValidacion.controls['telefono'].value
    usuario.rol = this.fgValidacion.controls['rol'].value
    this.usuarioServices.actualizarUsuario(usuario).subscribe(
      {next: ()=> {window.location.reload()},
      error: (error: HttpErrorResponse)=>{this.toastr.error(`${error}`, 'ERROR')}
    }
      )

  }

  cerrarPanel(){
    this.activarServices.$activarPanelEditar.emit(false)
  }

}
