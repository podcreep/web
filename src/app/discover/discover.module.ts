import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { DiscoverComponent } from './discover';
import { DiscoverDetailsComponent } from './details';

import { PipesModule } from '../../pipes/pipes.module';
import { ServicesModule } from '../../services/services.module';

@NgModule({
  declarations: [
    DiscoverComponent,
    DiscoverDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    ServicesModule,
  ],
  providers: []
})
export class DiscoverModule { }
