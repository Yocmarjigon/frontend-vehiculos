import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environment/env';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = 'http://localhost:3002';
  
  constructor(private http: HttpClient) {
  }

  obtenerUsuarios(): Observable<Usuario[]>{
    return( this.http.get<Usuario[]>(`${this.url}/usuario`))
    

  }

  registrarUsuarios(usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/usuario`, usuario)
  }

  iniciarSesion(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/autentificacion/login`, usuario);
  }
}
