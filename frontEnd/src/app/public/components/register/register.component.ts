import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, ViewChild  } from '@angular/core';
import { CustomValidators } from '../../custom-validator';
import { AuthService } from '../../services/auth-service/account.services';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('passwordInput')
  passwordRef!: ElementRef;

  @ViewChild('passwordEye')
  passwordEyeRef!: ElementRef;

  @ViewChild('matchPassword')
  matchPasswordRef!: ElementRef;

  @ViewChild('matchPasswordEye')
  matchPasswordEyeRef!: ElementRef;

  passwordIcon: string = 'visibility';
  passwordMatchIcon: string = 'visibility';

  registerForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(8)])
  },
    { validators: CustomValidators.passwordsMatching }
  )


  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get passwordConfirm() { return this.registerForm.get('passwordConfirm'); }
  showLoading:boolean=false

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService:AlertService
  ) {

   }

  handleRegister() {
    if (!this.registerForm.valid) {
      return;
    }
    delete this.registerForm.value["passwordConfirm"]
    this.showLoading=true
    this.authService.register(this.registerForm.value).subscribe({
      next: (res:any) => {
        this.alertService.showAlert(res.message,"Ok",4000)
        this.router.navigate(["../login"])
        this.showLoading=false
        this.alertService.showAlert("User Registered","Successfully",3000)
      },
      error: (responseError:any) => {
        console.log("error",responseError.error.errors);
        for (let item of responseError.error.errors) {
          this.alertService.showAlert(item.message,"Error",4000);
        } 
        // this.alertService.showAlert(error.message,"Error",4000)
        this.showLoading=false
      }
    });
  }

  onChangePasswordEye() {
    if (this.passwordRef.nativeElement.getAttribute('type') === 'text') {
      this.passwordRef.nativeElement.setAttribute('type', 'password');

      if (this.passwordEyeRef.nativeElement != undefined) {
        this.passwordIcon = 'visibility';
      }
    } else {
      this.passwordRef.nativeElement.setAttribute('type', 'text');

      if (this.passwordEyeRef.nativeElement != undefined) {
        this.passwordIcon = 'visibility_off';
      }
    }
  }

  onChangeMatchPasswordEye() {
    if (this.matchPasswordRef.nativeElement.getAttribute('type') === 'text') {
      this.matchPasswordRef.nativeElement.setAttribute('type', 'password');

      if (this.matchPasswordEyeRef.nativeElement != undefined) {
        this.passwordMatchIcon = 'visibility';
      }
    } else {
      this.matchPasswordRef.nativeElement.setAttribute('type', 'text');

      if (this.matchPasswordEyeRef.nativeElement != undefined) {
        this.passwordMatchIcon = 'visibility_off';
      }
    }
  }

}
