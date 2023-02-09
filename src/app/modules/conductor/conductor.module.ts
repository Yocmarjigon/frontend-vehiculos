import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConductorRoutingModule } from './conductor-routing.module';
import { IndexComponent } from './index/index.component';
import { CrearComponent } from './crear/crear.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallesComponent } from './detalles/detalles.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditarComponent } from './editar/editar.component';
import { FiltrarPipe } from 'src/app/pipes/filtrar.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    IndexComponent,
    CrearComponent,
    DetallesComponent,
    EditarComponent,
    FiltrarPipe

  ],
  imports: [
    CommonModule,
    ConductorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
    
  ]
})
export class ConductorModule { }
