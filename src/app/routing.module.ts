import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LandingComponent } from './landing';
import { AccountModule } from './account/account.module';
import { LoginComponent } from './account/login';
import { RegisterComponent } from './account/register';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LandingComponent },
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    AccountModule,
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
