import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { IndexComponent } from './index/index.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CrearComponent } from './crear/crear.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VehiculosModule { }
