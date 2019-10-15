import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
URL: string = "https://localhost:44335/api";
  constructor( private _http : HttpClient) { }

  getAllRestaurants()
  {
    return this._http.get(this.URL + '/Main/allrestaurants');
  }
}
