import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountModule } from './account/account.module';
import { PodcastsModule } from './podcasts/podcasts.module';

import { LandingComponent } from './landing';
import { LoginComponent } from './account/login';
import { RegisterComponent } from './account/register';
import { PodcastsListComponent } from './podcasts/podcasts_list';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'podcasts', component: PodcastsListComponent },
  { path: '', component: LandingComponent },
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    AccountModule,
    PodcastsModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule,
  ]
})
export class RoutingModule {
}
