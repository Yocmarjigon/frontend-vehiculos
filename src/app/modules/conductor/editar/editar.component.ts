import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Conductor } from 'src/app/models/Conductor';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { ConductorService } from 'src/app/services/conductor.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent  implements OnInit {

  fgValidacion: FormGroup = this.fb.group({
  cedula: [''],
  email : [''],
  nombre_apellido: [''],
  licencia:  [''],
  categoria: [''],
  pdf_licencia: [''],
  licencia_exp: [''],
  licencia_venc: ['']
  })
  


  fileTamp:any;
  @Input() idConductor:string = '';
  constructor(
    private actigarServices: ActivarPanelService,
    private conductorServices: ConductorService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ){
  }

  ngOnInit(): void {
    this.cargarConductor()
    
  }


  cargarConductor ()  {
    this.conductorServices.mostrarConductor(this.idConductor).subscribe(conductor =>{
      this.fgValidacion.controls['cedula'].setValue(conductor.cedula)
      this.fgValidacion.controls['email'].setValue(conductor.email)
      this.fgValidacion.controls['nombre_apellido'].setValue(conductor.nombre_apellido)
      this.fgValidacion.controls['licencia'].setValue(conductor.licencia)
      this.fgValidacion.controls['categoria'].setValue(conductor.categoria)
      this.fgValidacion.controls['licencia_exp'].setValue(conductor.licencia_exp)
      this.fgValidacion.controls['licencia_venc'].setValue(conductor.licencia_venc)
   
    })
  }

  capturaPdf($event:any){
   

    const [file] = $event.target.files
    this.fileTamp ={
      fileRaw: file,
      fileName: file.name
    }
  }

  actualizandoConductor(){
    const conductor = new Conductor()
    conductor.cedula = this.fgValidacion.controls['cedula'].value
    conductor.email = this.fgValidacion.controls['email'].value
    conductor.nombre_apellido = this.fgValidacion.controls['nombre_apellido'].value
    conductor.licencia =  this.fgValidacion.controls['licencia'].value
    conductor.categoria =   this.fgValidacion.controls['categoria'].value
    conductor.licencia_exp =   this.fgValidacion.controls['licencia_exp'].value
    conductor.licencia_venc =   this.fgValidacion.controls['licencia_venc'].value
    
    this.conductorServices.actualizarConductor(conductor).subscribe({
      next: ()=>{window.location.reload()},
      error: (error: HttpErrorResponse) =>{this.toastr.error(`${error}`, 'ERROR') }
    })
   
  }

  cerrarPanel(){
    this.actigarServices.$activarPanelEditar.emit(false)
  }
  
}
