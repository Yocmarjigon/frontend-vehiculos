import { DOCUMENT, Location, LocationStrategy } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {ViewChild} from '@angular/core'
import { Route, Router } from '@angular/router';
import { ActivarPanelService } from './services/activar-panel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit {
  
  title = 'admin-vehiculos';

  constructor(private renderer2: Renderer2 ,private router: Router, private activarServices: ActivarPanelService){

  }
  @ViewChild('asNav')nav!: ElementRef;
  activarNav:boolean = false;
  ngOnInit(): void {
    this.activarServices.$panelNav.subscribe(valor => this.activarNav = valor)
  }
  mostrarNav = () =>{
    if(localStorage.getItem('token')){
      
    }
  }
}



