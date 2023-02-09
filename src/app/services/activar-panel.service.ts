import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivarPanelService {
  constructor() { }

  $activarPanelCrear = new EventEmitter<any>();
  $activarPanelDetalles = new EventEmitter<any>();
  $activarPanelEditar = new EventEmitter<any>();
  $panelNav = new EventEmitter<any>();
  $enviarId = new EventEmitter<any>();
}
