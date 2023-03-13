import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/models/Vehiculo';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  searchText: any;
  p = 1;
  activarCrear: boolean = false 

  constructor(
    private activarPanel: ActivarPanelService,
    private vehiculoServices: VehiculoService
  ){
    
  }

  ngOnInit(): void{
    this.activarPanel.$panelNav.emit(true)
    this.cargarVehiculo()
    this.activarPanel.$activarPanelCrear.subscribe(valor => this.activarCrear = valor)
  }

  cargarVehiculo(){
    this.vehiculoServices.mostrarVehiculos().subscribe(valor => {this.vehiculos = valor; console.log(valor)})
  }

  abrirCrear(){
    this.activarCrear = true
  }
}
