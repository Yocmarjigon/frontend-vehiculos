import { DOCUMENT, Location, LocationStrategy } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {ViewChild} from '@angular/core'
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit {
  
  title = 'admin-vehiculos';

  constructor(private renderer2: Renderer2 ,private router: Router){

  }
  @ViewChild('asNav')nav!: ElementRef;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  mostrarNav = () =>{

   if(window.location.pathname =='/iniciar-sesion'){
    const asNav = this.nav.nativeElement;
    console.log(asNav)
    this.renderer2.setStyle(asNav, 'display' ,'none')
  }
  }
}



