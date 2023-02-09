import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuariosServices: UsuariosService,
    private activarPanel: ActivarPanelService,
    private toastr: ToastrService
    
    )
  {}

  ngOnInit(): void {
   this.usuariosServices.obtenerUsuarios().subscribe(datos => this.usuarios = datos) 
    this.activarPanel.$panelNav.emit(true)
  }

  eliminar(usuario: Usuario){

    Swal.fire({
      title: 'Deseas eliminar este usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosServices.eliminarUsuario(usuario).subscribe({
      
          next: (usuario)=>{this.toastr.success('El Usuario ha sido eliminado correctamente', 'CORRECTO'); this.ngOnInit()},
          error: (error: HttpErrorResponse) => {this.toastr.error(`${error}`,'ERROR')}
        
         })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  verificarUsuario(){
    
  }
  decodeJwt() {
    try {
      const token = localStorage.getItem('token');
      const tokenDecode: any = jwtDecode(token!);
      const id = tokenDecode.id;
      return id
    } catch (error) {
      console.log('Error decode jwt' +error);
    }
  }
}
