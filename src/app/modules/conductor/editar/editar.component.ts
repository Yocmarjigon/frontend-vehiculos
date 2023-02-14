import { Component, Input, OnInit } from '@angular/core';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { ConductorService } from 'src/app/services/conductor.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent  implements OnInit {
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

  fileTamp:any;
  @Input() idConductor:string = '';
  constructor(
    private actigarServices: ActivarPanelService,
    private conductorServices: ConductorService
    ){
  }

  ngOnInit(): void {
    this.cargarConductor()
    
  }


  cargarConductor ()  {
    this.conductorServices.mostrarConductor(this.idConductor).subscribe(valor =>{
      this.cedula = valor.cedula!
      this.email = valor.email!
      this.nombre_apellido = valor.nombre_apellido!
      this.licencia = valor.licencia!
      this.categoria = valor.categoria!;
      this.licencia_exp = valor.licencia_exp?.toString()!
      this.licencia_venc = valor.licencia_venc?.toString()!
      this.password = valor.password!
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
  }

  cerrarPanel(){
    this.actigarServices.$activarPanelEditar.emit(false)
  }
  
}
