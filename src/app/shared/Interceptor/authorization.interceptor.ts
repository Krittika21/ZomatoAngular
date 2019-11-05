import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable()
export class Authorization implements HttpInterceptor {
    currentToken: User;
    constructor(private userService: UserService) {
         
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        this.currentToken = JSON.parse(localStorage.getItem("currentUserToken"));
        if (this.currentToken) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${this.currentToken.auth_token}`
                }
            });
        }

        return next.handle(request);
    }
}