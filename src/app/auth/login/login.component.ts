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
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = true;
      }
    );
  }

  onSubmitLogin(loginForm): void{
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
      this.isLoading = true;
    }
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
    this.isLoading = true;
  }
}
