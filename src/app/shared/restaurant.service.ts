import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from './RestaurantAC.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
URL: string = "https://localhost:44335/api";
  constructor( private _http : HttpClient) { }

  getAllRestaurants()//:Observable<Restaurant[]>
  {
    debugger;
    return this._http.get(this.URL + '/Restaurant/allrestaurants');
  }
}
