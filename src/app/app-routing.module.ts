import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';

const routes: Routes = 
[
  {path: '', redirectTo:'/iniciar-sesion', pathMatch: "full"},
  {path: 'iniciar-sesion', component: InicioSesionComponent },
  {path: 'inicio', loadChildren: ()=> import('./modules/inicio/inicio.module').then(m => m.InicioModule)},
  {path: 'register', loadChildren: ()=> import('./modules/registrarse/registrarse.module').then(m => m.RegistrarseModule)},
  {path: 'usuario', loadChildren: ()=> import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
