/* tslint:disable:no-trailing-whitespace */
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {baseUrl} from '../../environments/environment';
import {Product} from './product';

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
  products: Product[];

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
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }



  // ------------------------------ product data crud operations ------------------------------




  public getProducts() {
    return this.http.get<Product[]>(`${baseUrl}/store`);
  }

  addProduct(product: Product): Observable<any> {
    const api = `${baseUrl}/store`;
    return this.http.post(api, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteProduct(product) {
    return this.http.delete(`${baseUrl}/store/${product._id}`);
  }

  public getProductData(id) {
    return this.http.get(`${baseUrl}/store/${id}`);
  }

  public updateProduct(product) {
    // console.log(product.product.products._id);
    return this.http.patch<Product>(`${baseUrl}/store/${product.product.products._id}`, product.product.products);
  }


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
