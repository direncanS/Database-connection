import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from 'src/app/interfaces/account.interfaces';
import { Register } from 'src/app/interfaces/account.interfaces';

export interface User{
  username:string,
  rank:number,
  score:number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private current_user$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(

    private http:HttpClient

  ) { }


  login(loginRequest: LoginRequest): Observable<any>
  {
    return this.http.post<LoginRequest>("/login",loginRequest)
  }

  register(registerRequest: Register) {
   return this.http.post<Register>("/register",registerRequest)
  }

  getUserWithToken(token:string)
  {
    return this.http.get<Register>( `/get-user-with-token/${token}`)
  }
  getCurrentUser() {
    return this.current_user$;
  }

  setCurrentUser(user: any) {
    this.current_user$.next(user);
  }
  logout()
  {

    return this.http.post("/logout",{})
  }


}
