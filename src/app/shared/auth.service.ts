import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {baseUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  Users = {};
  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  signUp(user: User): Observable<any> {
    const api = `${baseUrl}/auth/register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );

  }

  signIn(user: User) {
    return this.http.post<any>(`${baseUrl}/auth/login`, user)
      .subscribe((res: any) => {
        console.log(res.data.User._id);
        localStorage.setItem('authToken', res.data.User.authToken);
        localStorage.setItem('id', res.data.User._id);
        localStorage.setItem('name', res.data.User.name);
        this.router.navigate(['user-profile']);
      });
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('authToken');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    const removeToken = localStorage.removeItem('authToken');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // getUserProfile(authId): Observable<any> {
  //   const userId = localStorage.getItem('id');
  //   const api = `${baseUrl}/auth/list/${userId}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {};
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
