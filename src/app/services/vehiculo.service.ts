import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environment/env';
import { Vehiculo } from '../models/Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  url = env.endpoint
  constructor(private http:HttpClient) { }

  mostrarVehiculos():Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`${this.url}/vehiculo`)
  }

  crearVehiculo(vehiculo: Vehiculo):Observable<Vehiculo>{
    return this.http.post<Vehiculo>(`${this.url}/vehiculo`, vehiculo)
  }
}
