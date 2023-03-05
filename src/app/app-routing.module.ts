import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPaginaComponent } from './components/error-pagina/error-pagina.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { AutenticacionGuard } from './utils/autenticacion.guard';

const routes: Routes = 
[
  {path: '', redirectTo:'/iniciar-sesion', pathMatch: "full"},
  {path: 'iniciar-sesion', component: InicioSesionComponent },
  {path: 'inicio', loadChildren: ()=> import('./modules/inicio/inicio.module').then(m => m.InicioModule),  canActivate: [AutenticacionGuard]},
  {path: 'register', loadChildren: ()=> import('./modules/registrarse/registrarse.module').then(m => m.RegistrarseModule)},
  {path: 'usuario', loadChildren: ()=> import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate: [AutenticacionGuard]},
  {path: 'conductor', loadChildren: ()=> import('./modules/conductor/conductor.module').then(m => m.ConductorModule),  canActivate: [AutenticacionGuard]},
  {path: 'gerente', loadChildren: ()=> import('./modules/gerente/gerente.module').then(m => m.GerenteModule),  canActivate: [AutenticacionGuard]},
  {path: 'vehiculo', loadChildren: ()=> import('./modules/vehiculos/vehiculos.module').then(m=> m.VehiculosModule), canActivate: [AutenticacionGuard]},
  {path: 'estado', loadChildren: ()=> import('./modules/estado-conductor/estado-conductor.module').then(m => m.EstadoConductorModule)},
  {path: 'detalles-usuario', loadChildren: ()=> import('./plantilla/panel-usuario/panel-usuario.module').then(m => m.PanelUsuarioModule),  canActivate: [AutenticacionGuard]},
  {path: '**', component: ErrorPaginaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
