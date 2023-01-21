import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environment/env';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = 'http://localhost:3001';
  
  constructor(private http: HttpClient) {
  }

  obtenerUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`http://localhost:3001/usuario`)
  }

  registrarUsuarios(usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`http://localhost:3001/usuario`, usuario)
  }
}
