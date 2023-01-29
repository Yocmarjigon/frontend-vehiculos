import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductor } from '../models/Conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  url = 'http://localhost:3002';
  
  constructor(private http: HttpClient) { }

  mostrarConductor(): Observable<Conductor[]>{
    return this.http.get<Conductor[]>(`${this.url}/conductor`)
  }

  crearConductor(conductor: Conductor): Observable<Conductor>{
    return this.http.post<Conductor>(`${this.url}/conductor`, conductor)
  }
}
