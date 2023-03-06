import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import {ConductorService} from 'src/app/services/conductor.service'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @ViewChild("asEstadoColor",{static: true}) estadoColor!:ElementRef;
  @ViewChild("asAnimEstado", {static:true}) animEstado!: ElementRef
  email: string = '';
  cedula: string = '';
  nombre_apellido: string = '';
  estado: number = 0;

  id: string = '';
  constructor(
    private activarPanel: ActivarPanelService,
    private conductorServices: ConductorService,
    private renderer: Renderer2
  ){

  }

  ngOnInit(): void {
    this.activarPanel.$panelNav.emit(true)
    this.decodeJWT()
    this.cargarConductor()
    this.colorEstado()
  }

  decodeJWT(){
    const jwt:any = localStorage.getItem('token')
    const decode: any = jwtDecode(jwt)
    
    this.id = decode.id
   
  }


  cargarConductor(){
    this.conductorServices.mostrarConductor(this.id).subscribe(valor => {
      this.email  = valor.email!
      this.nombre_apellido = valor.nombre_apellido!
      this.cedula = valor.cedula!
      this.estado = valor.estado!

    })
  }  

  colorEstado(){
    const estadoColor = this.estadoColor.nativeElement
    const animEstado = this.animEstado.nativeElement
    if(this.estado === 0){
      this.renderer.addClass(estadoColor ,'est-vencida')
      this.renderer.addClass(animEstado, 'anima-estado-color-vencida')
    }
    if(this.estado === 1){
      this.renderer.setStyle(estadoColor, 'background-color','#28BA56')
    }

  }
}

