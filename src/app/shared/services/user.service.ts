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

  URL: string = "https://localhost:44335/api";
  //baseUrl: string = 'api';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
  }

  register(email: string, password: string, UserName: string, confirmPassword:string) {
    let body = JSON.stringify({ email, password, UserName, confirmPassword });
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
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  }


