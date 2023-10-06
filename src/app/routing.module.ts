import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountModule } from './account/account.module';
import { DiscoverModule } from './discover/discover.module';
import { PodcastsModule } from './podcasts/podcasts.module';

import { LandingComponent } from './landing';
import { LoginComponent } from './account/login';
import { RegisterComponent } from './account/register';
import { SubscriptionsComponent } from './podcasts/subscriptions';
import { DiscoverComponent } from './discover/discover';
import { DetailsComponent } from './podcasts/details';
import { PrivacyPolicyComponent } from './privacy_policy';
import { DiscoverDetailsComponent } from './discover/details';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'discover/:id', component: DiscoverDetailsComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'podcasts/:id', component: DetailsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '', component: LandingComponent },
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    AccountModule,
    DiscoverModule,
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
