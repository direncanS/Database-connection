import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { JwtModule } from '@auth0/angular-jwt';
import { DomainInterceptor } from './utilities/domain.interceptor';
import { AuthInterceptor } from './utilities/auth.interceptor';



export const LOCALSTORAGE_TOKEN_KEY = 'login-and-register';

export function tokenGetter() {
  return localStorage.getItem("accessToken");
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    MatSnackBarModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter,
    //     allowedDomains: ['http://localhost:3000',]
    //   }
    // }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:DomainInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
