import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environment/env';
import { Gerente } from '../models/Gerente';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {
  url = env.endpoint

  constructor(private http: HttpClient) {}

  mostrarGerente():Observable<Gerente[]>{
    return this.http.get<Gerente[]>(`${this.url}/gerente`)
  }
  crearGerente(gerente: Gerente):Observable<Gerente>{
    return this.http.post<Gerente>(`${this.url}/gerente`, gerente)
  }

}
