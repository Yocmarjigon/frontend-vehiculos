import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environment/env';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = env.endpoint;
  
  constructor(private http: HttpClient) {
  }

  obtenerUsuarios(): Observable<Usuario[]>{
    return( this.http.get<Usuario[]>(`${this.url}/usuario`))
    

  }
  obtenerUsuario(id: string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/usuario/${id}`)
  }

  registrarUsuarios(usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/usuario`, usuario)
  }

  iniciarSesion(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/autentificacion/login`, usuario);
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.url}/conductor/${usuario.id_usuarios}`, usuario)
  }

  eliminarUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.url}/usuario/${usuario.id_usuarios}`)
  }
}
