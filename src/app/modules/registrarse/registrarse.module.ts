import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarseRoutingModule } from './registrarse-routing.module';
import { IndexComponent } from './index/index.component';
import { ViaComponent } from 'src/app/plantilla/via/via.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideErrorTailorConfig,
  errorTailorImports,
} from '@ngneat/error-tailor';

@NgModule({
  declarations: [IndexComponent],

  providers: [
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'El campo es requerido',
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: (error) => `Address isn't valid`,
        },
      },
    }),
  ],

  imports: [
    CommonModule,
    RegistrarseRoutingModule,
    ViaComponent,
    FormsModule,
    ReactiveFormsModule,
    errorTailorImports,
  ],
})
export class RegistrarseModule {}
