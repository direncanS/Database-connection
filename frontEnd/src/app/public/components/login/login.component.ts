import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/account.services';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput')
  passwordRef!: ElementRef;
  @ViewChild('passwordEye')
  passwordEyeRef!: ElementRef;
  currentIcon: string = 'visibility';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });


  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  showLoading:boolean=false
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {

  }

  handleLogin() {
    if (!this.loginForm.valid) {
      return;
    }
   this.showLoading=true
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {

        let user = res.user
        localStorage.setItem("accessToken",res.accessToken)
        this.authService.setCurrentUser(user)
        this.alertService.showAlert(res.message,"Success",4000)
        this.router.navigate(['../../protected/dashboard'])
        this.showLoading=false
        this.alertService.showAlert("Login","Successfully",3000)

      },
      error: (error) => {
        console.log(error)
        if(error.error.hasOwnProperty("errors")&&error.error.errors.length>0)
        {
          for(let item of error.error.errors)
          {

            this.alertService.showAlert(item.message,"Error",4000)
          }

        }
        else
        {
          this.alertService.showAlert(error.error.message,"Error",4000)
        }
        this.showLoading=false

      }
    });




  }
  onChangePasswordEye() {
    if (this.passwordRef.nativeElement.getAttribute('type') === 'text') {
      this.passwordRef.nativeElement.setAttribute('type', 'password');

      if (this.passwordEyeRef.nativeElement != undefined) {
        this.currentIcon = 'visibility';
      }
    } else {
      this.passwordRef.nativeElement.setAttribute('type', 'text');

      if (this.passwordEyeRef.nativeElement != undefined) {
        this.currentIcon = 'visibility_off';

      }
    }
  }



}
