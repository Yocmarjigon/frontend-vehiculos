import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoConductorRoutingModule } from './estado-conductor-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    EstadoConductorRoutingModule
  ]
})
export class EstadoConductorModule { }
