import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable, of } from 'rxjs';

import { AppComponent } from './app';
import { LandingComponent } from './landing';
import { PlaybackComponent } from './playback';
import { PodcastsService } from '../services/podcasts';
import { AccountService } from '../services/account';

import { RoutingModule } from './routing.module';

function init(podcastsService: PodcastsService, accountService: AccountService): () => Observable<any> {
  if (!accountService.isLoggedIn()) {
    // If you're not logged in, nothing to do.
    return () => of(true);
  }

  // TODO: get most recently-played episode and open up the playback sheet with it already populated
  return () => of(true);
}

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
    MatIconModule,
    MatToolbarModule,
    RoutingModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: init,
    deps: [PodcastsService, AccountService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
