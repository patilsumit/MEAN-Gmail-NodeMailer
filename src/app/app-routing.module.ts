import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users/login', component: LoginComponent },
  {
    path: 'users/profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'users/sendemail',
    component: ComposeEmailComponent,
    canActivate: [AuthGuardService]
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
