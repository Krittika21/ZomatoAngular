import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantAC } from './RestaurantAC.model';
import { AllDishes } from './AllDishes.model';
import { AllRestaurants } from './AllRestaurants.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  URL: string = "https://localhost:44335/api";
  RestaurantId: number;
  constructor( private _http: HttpClient) { }
  setRestaurantId(id: number)
  {
    this.RestaurantId = id;
  }

  getRestaurantId()
  {
    return this.RestaurantId;
  }

  getAllRestaurants():Observable<AllRestaurants[]>
  {
    return this._http.get<AllRestaurants[]>(this.URL + '/Restaurant/allrestaurants');
  }

  getRestaurantLocation(id:number)
  {
    return this._http.get(this.URL + '/Restaurant/restaurant/'+ id);
  }
  getDishes(id: number): Observable<AllDishes[]>
  {
    return this._http.get<AllDishes[]>(this.URL + '/Restaurant/restaurant/dishes/' + id);
  }
}
