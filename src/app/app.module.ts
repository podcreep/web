import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, } from '@angular/material';

import { AppComponent } from './app';
import { LandingComponent } from './landing';
import { PlaybackComponent } from './playback';

import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PlaybackComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
