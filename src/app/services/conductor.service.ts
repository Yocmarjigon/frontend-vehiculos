import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductor } from '../models/Conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  url = 'http://localhost:3006';
  
  constructor(private http: HttpClient) { }

  mostrarConductores(): Observable<Conductor[]>{
    return this.http.get<Conductor[]>(`${this.url}/conductor`)
  }
  mostrarConductor(id:string): Observable<Conductor>{
    return this.http.get<Conductor>(`${this.url}/conductor/${id}`)
  }


  crearConductor(conductor: Conductor): Observable<Conductor>{
    return this.http.post<Conductor>(`${this.url}/conductor`, conductor)
  }

  enviarpdf(body: FormData): Observable<any>{
    return this.http.post<any>(`${this.url}/conductor/upload`, body)
  }

  actualizarConductor(conductor: Conductor):Observable<Conductor>{
    return this.http.put<Conductor>(`${this.url}/conductor/${conductor.id_conductor}`, conductor)
  }

  eliminarConductor(conductor: Conductor): Observable<Conductor>{
    return this.http.delete<Conductor>(`${this.url}/conductor/${conductor.id_conductor}`)
  }
}


