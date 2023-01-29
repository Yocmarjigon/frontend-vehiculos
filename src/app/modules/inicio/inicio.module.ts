import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { IndexComponent } from './index/index.component';
import { ViaComponent } from 'src/app/plantilla/via/via.component';



@NgModule({
  declarations: [
    IndexComponent,
    
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ViaComponent
  ]
})
export class InicioModule { }
