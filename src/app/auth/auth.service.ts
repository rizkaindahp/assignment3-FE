import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthLogin, User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const BACKEND_URL = environment.baseURL + '/auth/';

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
      if (response.success) {
        this.isAuthenticated = true
        this.authStatusListener.next(true);
        console.log(this.isAuthenticated);
        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
  })
  }

  getIsAuth(): any {
    return this.isAuthenticated;
  }
  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }
  
  register(user : User) {
    return this.http.post<any>(`${environment.baseURL}auth/register`, user).subscribe((res: any) => {
      Swal.fire('Welcome to Rizka Store','You can login now','success')
      this.router.navigate(['']);
    },
    err => {
      Swal.fire('Sorry',err.error.message,'error')
    })
  }
}

  // getToken(): any {
  //   return this.token;
  // }



  // getUserId(): any {
  //   return this.userId;
  // }



  // createUser(email: string, password: string): any {
  //   const authData: AuthLogin = { email, password };
  //   this.http.post(BACKEND_URL + 'register', authData).subscribe(
  //     () => {
  //       this.router.navigate(['/']);
  //     },
  //     error => {
  //       this.authStatusListener.next(false);
  //     }
  //   );
  // }


  // login(email: string, password: string): any {
  //   const authData: AuthLogin = { email, password };
  //   this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + 'login', authData)
  //     .subscribe(response => {
  //       const token = response.token;
  //       this.token = token;
  //       if (token) {
  //         const expiresInDuration = response.expiresIn;
  //         this.setAuthTimer(expiresInDuration);
  //         this.isAuthenticated = true;
  //         this.userId = response.userId;
  //         this.authStatusListener.next(true);
  //         const now = new Date();
  //         const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
  //         console.log(expirationDate);
  //         this.saveAuthData(token, expirationDate, this.userId);
  //         this.router.navigate(['/']);
  //       }
  //     }, error => {
  //       this.authStatusListener.next(false);
  //     });
  // }

  // autoAuthUser(): any {
  //   const authInformation = this.getAuthData();
  //   if (!authInformation) {
  //     return;
  //   }
  //   const now = new Date();
  //   const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  //   if (expiresIn > 0) {
  //     this.token = authInformation.token;
  //     this.isAuthenticated = true;
  //     this.userId = authInformation.userId;
  //     this.setAuthTimer(expiresIn / 1000);
  //     this.authStatusListener.next(true);
  //   }
  // }

  // logout(): any {
  //   this.token = null;
  //   this.isAuthenticated = false;
  //   this.authStatusListener.next(false);
  //   this.userId = null;
  //   clearTimeout(this.tokenTimer);
  //   this.clearAuthData();
  //   this.router.navigate(['/']);
  // }

  // private setAuthTimer(duration: number): any {
  //   console.log('setting timer: ' + duration);
  //   this.tokenTimer = setTimeout(() => {
  //     this.logout();
  //   }, duration * 1000);
  // }

  // private saveAuthData(token: string, expirationDate: Date, userId: string): any {
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('expiration', expirationDate.toISOString());
  //   localStorage.setItem('userId', userId);
  // }

  // private clearAuthData(): any {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('expiration');
  //   localStorage.removeItem('userId');
  // }

  // private getAuthData(): any {
  //   const token = localStorage.getItem('token');
  //   const expirationDate = localStorage.getItem('expiration');
  //   const userId = localStorage.getItem('userId');
  //   if (!token || !expirationDate) {
  //     return;
  //   }
  //   return {
  //     token,
  //     expirationDate: new Date(expirationDate),
  //     userId
  //   };
  // }



