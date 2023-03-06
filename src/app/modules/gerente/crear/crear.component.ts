import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { GerenteService } from 'src/app/services/gerente.service';
import { Gerente } from '../../../models/Gerente';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
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
      private activarServices: ActivarPanelService,
      private fb: FormBuilder,
      private gerenteServices: GerenteService,
      private toastr: ToastrService

    ){

  }

  ngOnInit(): void {
    
  }

  crearGerente(){
    if(
      this.fgValidacion.controls['nombre_apellido'].value === '' ||
      this.fgValidacion.controls['email'].value === '' ||
      this.fgValidacion.controls['telefono'].value === '' ||
      this.fgValidacion.controls['password'].value === '' ||
      this.fgValidacion.controls['repetirPassword'].value === ''
      
    ){
      this.toastr.error('Todos los campos son obligatorios', 'ERROR')
    }

    if(
      this.fgValidacion.controls['password'].value != this.fgValidacion.controls['repetirPassword'].value
    ){
      this.toastr.error('Las password no son iguales', 'ERROR')
    }

    const gerente = new Gerente()
    gerente.nombre_apellido = this.fgValidacion.controls['nombre_apellido'].value
    gerente.email = this.fgValidacion.controls['email'].value
    gerente.telefono = this.fgValidacion.controls['telefono'].value
    gerente.password = this.fgValidacion.controls['password'].value

    this.gerenteServices.crearGerente(gerente).subscribe({
      next: ()=>{window.location.reload()},
      error: (error: HttpErrorResponse)=>{ this.toastr.error(`${error.error.msg}`, 'ERROR')}
    })
  }

  
  cerrarPanel() {
    this.activarServices.$activarPanelCrear.emit(false);
  }
}
