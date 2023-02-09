import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenteRoutingModule } from './gerente-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    GerenteRoutingModule
  ]
})
export class GerenteModule { }
