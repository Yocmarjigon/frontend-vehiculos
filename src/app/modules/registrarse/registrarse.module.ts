import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarseRoutingModule } from './registrarse-routing.module';
import { IndexComponent } from './index/index.component';
import { ViaComponent } from 'src/app/plantilla/via/via.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnersAngularModule } from 'spinners-angular';


@NgModule({
		declarations: [
				IndexComponent,
		
		],
		imports: [
				CommonModule,
				RegistrarseRoutingModule,
				ViaComponent,
				FormsModule, 
				ReactiveFormsModule,
				
		]
})
export class RegistrarseModule { }
