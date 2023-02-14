import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Conductor } from 'src/app/models/Conductor';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  nombreUsuario = '';
  email = '';
  telefono = ''
  cedula = ''
  rol = ''



  constructor(
    private activarServices: ActivarPanelService,
    private conductorServices: ConductorService,
    private usuarioServices: UsuariosService,
  ) {}

  ngOnInit(): void {
    this.activarServices.$panelNav.emit(true);
    this.decodeJwt();
    this.interceptarTipoUsuario()

  }

  decodeJwt() {
    try {
      const token = localStorage.getItem('token');
      const tokenDecode: any = jwtDecode(token!);
      return tokenDecode;
    } catch (error) {
      console.log('Error decode jwt' + error);
    }
  }

  interceptarTipoUsuario(){
    const rol = this.decodeJwt().rol
    if(rol === 'admin'){
      this.mostrarUsuario()
    }
    if(rol === 'condutor'){
      this.mostrarConductor()
    }

    if(rol === 'gerente'){
      this.mostrarConductor()
    }

    }


  mostrarUsuario(){
    const id = this.decodeJwt().id;
    this.usuarioServices.obtenerUsuario(id).subscribe((valor)  =>{
      this.nombreUsuario = valor.nombre_apellido!;
      this.email = valor.email!;
      this.telefono = valor.telefono!;
      this.rol = valor.rol!;
    })

  }
  mostrarConductor() {
    const id = this.decodeJwt().id;
    this.conductorServices.mostrarConductor(id).subscribe((valor)  =>{
      this.nombreUsuario = valor.nombre_apellido!;
      this.email = valor.email!;
      this.telefono = valor.cedula!;
    })
  }
}
