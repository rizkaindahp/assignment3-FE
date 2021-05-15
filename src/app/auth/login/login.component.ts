import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginForm: FormGroup;
  private authStatusSub: Subscription;
  constructor( private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), ])
    });
    // this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
    //   authStatus => {
    //     this.isLoading = false;
    //   }
    // );
  }

  onSubmitLogin(loginForm): void{
    // if (loginForm.invalid) {
    //   return;
    // }
    // this.authService.login(loginForm.value.email, loginForm.value.password);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }

  }

  // ngOnDestroy(): void {
  //   this.authStatusSub.unsubscribe();
  // }
}

// if (this.loginForm.valid) {
//   this.authService.login(this.loginForm.value).subscribe((response: any) => {
//     if (response.success) {
//       console.log(response);
//     } else {
//       console.log(response);
//     }
//   });
// }
