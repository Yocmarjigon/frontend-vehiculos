import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Conductor } from 'src/app/models/Conductor';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { ConductorService } from 'src/app/services/conductor.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  @ViewChild('asEstado', { static: true }) estadoActivar!: ElementRef;
  contador: number = 0;
  conductores: Conductor[] = [];
  estado: string = '';
  activarCrear: boolean = false;

  constructor(
    private conductorServices: ConductorService,
    private renderer2: Renderer2,
    private router: Router,
    private activarServices: ActivarPanelService,

  ) {}

  ngOnInit(): void {
    this.mostrandoConductor();
    console.log(this.activarCrear);
    this.activarServices.$panel.subscribe(
      (valor) => (this.activarCrear = valor)
    );
    this.activarServices.$panelNav.emit(true)
  }

  mostrandoConductor() {
    const contenido = this.conductorServices
      .mostrarConductor()
      .subscribe((datos) => {
        this.conductores = datos;

        let vencida = datos.map((f) => {
          return f.estado;
        });
        if (vencida.includes(0)) {
          this.estado = 'vencida';
        }

        this.estadoLicencia(vencida);
      });
    return contenido;
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
      console.log(vencidas);
      this.renderer2.setStyle(asEstado, 'background-color', 'red');
    }
  }

  abrirCrear() {
    this.activarCrear = true;
  }
}
