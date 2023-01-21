import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuariosServices: UsuariosService)
  {}

  ngOnInit(): void {
   this.usuariosServices.obtenerUsuarios().subscribe(usuarios => this.usuarios = usuarios) 
  }
}
