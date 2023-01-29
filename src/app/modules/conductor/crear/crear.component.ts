import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {
  id_usuarios = '';
  cedula = '';
  nombre_apellido = '';
  licencia = '';
  licencia_exp = '';
  licencia_venc = '';
  categoria = '';

  usuarios: Usuario[] = [] 

  @ViewChild('asCrearConductor', { static: true }) activar!: ElementRef;

  constructor(
    private index: IndexComponent,
    private renderer2: Renderer2,
    private activarServices: ActivarPanelService,
    private conductorServices: ConductorService,
    private usuarioServices: UsuariosService
  ) {}

  ngOnInit(): void {
    this.recolectoandoConductores()
  }

  crearConductor(){
    
  }

  recolectoandoConductores(){
    this.usuarioServices.obtenerUsuarios().subscribe(usuario => this.usuarios = usuario)
  }

  cerrarPanel() {
    this.activarServices.$panel.emit(false);
  }
}
