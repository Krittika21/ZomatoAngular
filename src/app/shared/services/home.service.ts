/* import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {

  URL: string = ''; 
    
    constructor(private http: HttpClient) {
       super();
       this.URL = "https://localhost:44335/api";
    }
    
    getHomeDetails(): Observable<any> {
        let authToken = localStorage.getItem('auth_token');
        let httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
        );
        const options = {
          headers: httpHeaders
        }
        return this.http.get(this.URL + "/all-restaurants", options);
      }  
    }
     */