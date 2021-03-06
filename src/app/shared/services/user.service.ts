import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  URL: string = "https://localhost:44349/api";
  //baseUrl: string = 'api';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient) {
    super();
    this.loggedIn = !!localStorage.getItem('currentUser');
    this._authNavStatusSource.next(this.loggedIn);
  }

  register(email: string, password: string, UserName: string, confirmPassword:string, fullName:string, phoneNumber:string) {
    let body = JSON.stringify({ email, password, UserName, confirmPassword, fullName, phoneNumber });
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    }
    );
    const options = {
      headers: httpHeaders
    }

    return this.http.post(this.URL + "/Account/signUp", body, options);
  }
  
  logIn(email: string, password: string)
  {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    }
    );
    const options = {
      headers: httpHeaders
    }
    return this.http.post<User>(this.URL + '/Account/logIn',JSON.stringify({ email, password }), options).pipe(map(res => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      this.loggedIn = true;
      this._authNavStatusSource.next(true);
      return true;
    },
    err => {
      console.log(err);
    }));
  }
  LogOut()
  {
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getCurrentUser(UserName: string, role:string): Observable<User>
  {
    return this.http.get<User>(this.URL + '/Account/login');
  }

}


