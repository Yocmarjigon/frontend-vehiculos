import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivarPanelService {
  constructor() { }

  $panel = new EventEmitter<any>();
  $panelNav = new EventEmitter<any>();
}
