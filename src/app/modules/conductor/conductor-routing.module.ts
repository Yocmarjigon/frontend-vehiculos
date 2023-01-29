import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path:'', component: IndexComponent},
  {path: 'crear', component: CrearComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConductorRoutingModule { }
