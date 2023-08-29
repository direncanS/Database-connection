import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http:HttpClient
  ) {


  }
  getUserList()
  {
    return this.http.get( `/get-users`)
  }
  generateScore(data:{username:string,score:number}): Observable<any> {
    return this.http.patch("/create-score",data)
   }
}
