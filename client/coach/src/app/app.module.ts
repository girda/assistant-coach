import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from "./shared/services/token-interceptor.service";

import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { RegisterPageComponent } from './register-page/register-page.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { MusclesPageComponent } from './create-page/pages/muscles-page/muscles-page.component';
import { MusclesFormComponent } from './create-page/pages/muscles-page/muscles-form/muscles-form.component';
import { MuscleFormComponent } from './create-page/pages/muscles-page/muscles-form/muscle-form/muscle-form.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { WorkoutsPageComponent } from './create-page/pages/workouts-page/workouts-page.component';
import { WorkoutFormComponent } from './create-page/pages/workouts-page/workout-form/workout-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    CreatePageComponent,
    RegisterPageComponent,
    MusclesPageComponent,
    MusclesFormComponent,
    MuscleFormComponent,
    LoaderComponent,
    WorkoutsPageComponent,
    WorkoutFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
