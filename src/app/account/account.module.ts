import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicesModule } from '../../services/services.module';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ServicesModule,
  ],
  providers: []
})
export class AccountModule { }
