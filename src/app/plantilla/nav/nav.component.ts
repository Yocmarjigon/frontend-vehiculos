import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import { ActivarPanelService } from 'src/app/services/activar-panel.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  nombreUsuario: string = '';
  rol: string = ''

  @ViewChild('asNav', { static: true }) nav!: ElementRef;

  constructor(
    private rendere2: Renderer2,
    private router: Router,
    private activarServices: ActivarPanelService,
  
  ) {}

  ngOnInit(): void {
    this.esconderNav();
    this.decodeJwt()
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.activarServices.$panelNav.emit(false);
    this.router.navigate(['/iniciar-sesion']);
  }

  esconderNav() {
    if (localStorage.getItem('token') == undefined) {
      const asNav = this.nav.nativeElement;
      this.rendere2.setStyle(asNav, 'display', 'flex');
    }
    if (localStorage.getItem('token') == 'token') {
      const asNav = this.nav.nativeElement;
      this.rendere2.setStyle(asNav, 'display', 'flex');
    }
  }

  decodeJwt() {
    try {
      const token = localStorage.getItem('token');
      const tokenDecode: any = jwtDecode(token!);
      const id = tokenDecode.id;
      this.rol = tokenDecode.rol
      this.nombreUsuario = tokenDecode.email;
      this.activarServices.$enviarId.emit(id)
    } catch (error) {
      console.log('Error decode jwt' +error);
    }
  }
}
