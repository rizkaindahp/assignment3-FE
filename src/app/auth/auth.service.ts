import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthLogin, User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// const BACKEND_URL = environment.baseURL + '/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  login(data):any {
    console.log('run login..');
    return this.http.post(`${environment.baseURL}auth/login`, data).subscribe((response:any) => {
      console.log(response);
      this.token = response.data.bearerToken
      localStorage.setItem('token', response.data.bearerToken);
      if (response.success) {
        const expiresInDuration = response.data.expiresIn;
        this.isAuthenticated = true
        this.userId = response.data.userId;
        this.authStatusListener.next(true);
        console.log(this.isAuthenticated);
        this.router.navigate(['/']);
      }
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      this.authStatusListener.next(false);
      Swal.fire('Sorry', error.error.message, 'error')
  })
  }

  getIsAuth(): any {
    return this.isAuthenticated;
  }
  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }
  getToken(): any {
    return this.token;
  }
  getUserId(): any {
    return this.userId;
  }
  autoAuthUser(): any {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.authStatusListener.next(true);
    }
  }

  register(user : User) {
    return this.http.post<any>(`${environment.baseURL}auth/register`, user).subscribe((res: any) => {
      Swal.fire('Welcome to Rizka Store','You can login now','success')
      this.router.navigate(['']);
    },
    err => {
      Swal.fire('Sorry', err.error.message, 'error')
    })
  }
  private clearAuthData(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }


  private saveAuthData(token: string, expirationDate: Date, userId: string): any {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private getAuthData(): any {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
  logout(): any {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logout Success',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/']);
  }

}




