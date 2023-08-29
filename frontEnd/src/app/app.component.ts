
import { AuthService } from './public/services/auth-service/account.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService,private router:Router)
  {}
  title = 'login-and-register';


  ngOnInit()
  {

    this.authService.getCurrentUser().subscribe({
      next:(user)=>{
       if(Object.entries(user).length<=0)
       {
        let token = localStorage.getItem("accessToken")
        if(token)
        {

          this.authService.getUserWithToken(token).subscribe(({
            next:(user:any)=>{


              this.authService.setCurrentUser(user.user.user)
            },
            error:(error)=>{
              this.router.navigate(["/"])
            }
          }))
        }
       }
      }
    })
  }
}
