import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarseRoutingModule } from './registrarse-routing.module';
import { IndexComponent } from './index/index.component';
import { ViaComponent } from 'src/app/plantilla/via/via.component';


@NgModule({
    declarations: [
        IndexComponent
    ],
    imports: [
        CommonModule,
        RegistrarseRoutingModule,
        ViaComponent
    ]
})
export class RegistrarseModule { }
