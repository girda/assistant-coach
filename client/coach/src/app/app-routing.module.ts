import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { CreatePageComponent } from './create-page/create-page.component';
import { GuardServices } from './shared/services/guard.service';
import { MusclesPageComponent } from './create-page/pages/muscles-page/muscles-page.component';
import { MusclesFormComponent } from './create-page/pages/muscles-page/muscles-form/muscles-form.component'
import { WorkoutsPageComponent } from './create-page/pages/workouts-page/workouts-page.component';
import { WorkoutFormComponent } from './create-page/pages/workouts-page/workout-form/workout-form.component';
import { DiaryPageComponent } from './diary-page/diary-page.component';
import {ClientPageComponent} from "./create-page/pages/client-page/client-page.component";
import {ClientFormComponent} from "./create-page/pages/client-page/client-form/client-form.component";

const routes: Routes = [{
  path: '',
  component: AuthLayoutComponent,
  children: [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent }
  ]
},
{
  path: '',
  component: SiteLayoutComponent,
  canActivate: [GuardServices],
  children: [
    { path: 'create', component: CreatePageComponent },
    { path: 'create/muscles', component: MusclesPageComponent },
    { path: 'create/muscles/new', component: MusclesFormComponent },
    { path: 'create/muscles/:id', component: MusclesFormComponent },
    { path: 'create/workouts', component: WorkoutsPageComponent },
    { path: 'create/workouts/new', component: WorkoutFormComponent },
    { path: 'create/workouts/:id', component: WorkoutFormComponent },
    { path: 'create/clients', component: ClientPageComponent },
    { path: 'create/clients/new', component: ClientFormComponent },
    { path: 'create/clients/:id', component: ClientFormComponent },
    { path: 'diary', component: DiaryPageComponent },

  ]
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
