import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { IndexComponent } from './index/index.component';
import { provideErrorTailorConfig, errorTailorImports } from '@ngneat/error-tailor';
import { EditarComponent } from './editar/editar.component'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent,
    EditarComponent,
    
    
  ],

  providers:[ provideErrorTailorConfig({
    errors: {
      useValue: {
        required: 'El campo es requerido',
        minlength: ({ requiredLength, actualLength }) =>
          `Expect ${requiredLength} but got ${actualLength}`,
        invalidAddress: (error) => `Address isn't valid`,
      },
    },
  }),],
  
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    errorTailorImports,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsuariosModule { }
