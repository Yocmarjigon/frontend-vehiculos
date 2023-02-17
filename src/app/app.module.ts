import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { ViaComponent } from './plantilla/via/via.component';
import { NavComponent } from './plantilla/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { SpinnersAngularModule } from 'spinners-angular';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { FiltrarPipe } from './pipes/filtrar.pipe';
import { provideErrorTailorConfig, errorTailorImports} from '@ngneat/error-tailor';
import { ErrorPaginaComponent } from './components/error-pagina/error-pagina.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    NavComponent,
    ErrorPaginaComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true, },

    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'Este campo es requerido',
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: (error) => `Address isn't valid`,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViaComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    SpinnersAngularModule,
    Ng2SearchPipeModule,
    errorTailorImports,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),

    
    
  ],
})
export class AppModule {}
