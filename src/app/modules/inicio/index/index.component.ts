import { Component, OnInit } from '@angular/core';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private activarServices: ActivarPanelService){
  } 

  ngOnInit(): void {
    this.activarServices.$panelNav.emit(true)
  }


}
