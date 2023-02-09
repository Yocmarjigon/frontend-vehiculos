import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PanelUsuarioRoutingModule } from './panel-usuario-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    PanelUsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PanelUsuarioModule { }
