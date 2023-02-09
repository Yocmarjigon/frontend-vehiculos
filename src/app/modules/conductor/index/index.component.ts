import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Conductor } from 'src/app/models/Conductor';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { InfoService } from 'src/app/services/info.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {

  @ViewChild('asEstado', { static: true }) estadoActivar!: ElementRef;
  contador: number = 0;
  conductores: any = [];
  estado: string = '';
  activarCrear: boolean = false;
  activarDetalles: boolean = false;
  activarEditar: boolean = false;
  vencida: any = []
  
  p: number = 1;
  idEnv = ''
  filterPost = ''
  searchText: any;

  constructor(
    private conductorServices: ConductorService,
    private renderer2: Renderer2,
    private activarServices: ActivarPanelService,
    private infoServices: InfoService,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.mostrandoConductor();
    this.activarServices.$activarPanelDetalles.subscribe(
      (valor) => {this.activarDetalles = valor }
    );
    this.activarServices.$activarPanelCrear.subscribe(
      (valor) => {this.activarCrear = valor }
    )

    this.activarServices.$activarPanelEditar.subscribe(
      (valor) => {this.activarEditar = valor }
    )

    this.infoServices.$enviarId.subscribe(
      (valor)=> this.idEnv = valor
      )
    this.activarServices.$panelNav.emit(true)
  }

  mostrandoConductor() {
    const contenido = this.conductorServices
      .mostrarConductores()
      .subscribe((datos) => {
        this.conductores = datos;
    
        this.vencida = datos.map((f) => {
          
          return f.estado;
        });

        

        if (this.vencida.includes(0)) {
          this.estado = 'vencida';
        }

        this.estadoLicencia(this.vencida);
      });
    return contenido;
  }


  eliminandoConductor(conductor: Conductor){
    Swal.fire({
      title: 'Deseas eliminar este usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {

        this.conductorServices.eliminarConductor(conductor).subscribe({
          next: (conductor)=>{this.toastr.success('El Conductor ha sido eliminado correctamente','CORRECTO'); this.ngOnInit()},
          error: (error:HttpErrorResponse)=>{this.toastr.error(`${error}`,'ERROR')}
        })

      }
    })
   
  }

  estadoLicencia(es: number[]) {
    const asEstado = this.estadoActivar.nativeElement;

    for (let estado of es) {
      if (estado == 0) {
        this.estado = 'vencida';
      }
      if (estado == 1) {
        this.estado = 'activa';
      }
    }

    if (es.includes(0)) {
      let vencidas = es.filter((n) => n == 0);
      this.contador = vencidas.length;
      this.renderer2.setStyle(asEstado, 'background-color', 'red');
    }
  }

  abrirCrear() {
    this.activarCrear = true;
  }

  abrirDetalles(id: string) {
    this.activarDetalles = true;
    this.idEnv = id
  this.infoServices.$enviarId.emit(id)
    
  }

  abrirEditar(){
    this.activarEditar = true;
  }
}
