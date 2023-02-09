import { Component, OnInit } from '@angular/core';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';

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

  constructor(
    private actigarServices: ActivarPanelService
    ){
  }

  ngOnInit(): void {
  
    
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
