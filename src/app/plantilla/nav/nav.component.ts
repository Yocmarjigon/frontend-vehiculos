import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  nombreUsuario:string = ''

  @ViewChild('asNav',{static: true}) nav!: ElementRef;
  



  constructor(private rendere2:Renderer2, private router: Router, private activarServices: ActivarPanelService ){

  }

  ngOnInit(): void {
    console.log(localStorage)
    this.esconderNav()
    console.log(this.decodeJwt())
  }

  cerrarSesion (){
    localStorage.removeItem('token')
    this.activarServices.$panelNav.emit(false)
    this.router.navigate(['/iniciar-sesion'])
  }

  esconderNav (){
  if(localStorage.getItem('token') == undefined){

    const asNav = this.nav.nativeElement;
    this.rendere2.setStyle(asNav, 'display', 'flex')
  }if (localStorage.getItem('token') == 'token'){
    const asNav = this.nav.nativeElement;
    this.rendere2.setStyle(asNav, 'display', 'flex')
  }
  }

  decodeJwt (){
    try {
      const token = localStorage.getItem('token')
      const tokenDecode:any = jwtDecode(token!)
      this.nombreUsuario = tokenDecode.email
      return tokenDecode
    } catch (error) {
      console.log(error)
    }
  }



}
