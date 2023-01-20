import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { ViaComponent } from './plantilla/via/via.component';
import { NavComponent } from './plantilla/nav/nav.component';

@NgModule({
    declarations: [
        AppComponent,
        InicioSesionComponent,
        NavComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ViaComponent
    ],
    exports:[
        NavComponent
    ]
})
export class AppModule { }
