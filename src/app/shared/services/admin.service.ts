import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllDetails } from '../models/AllDetails.model';
import { Observable } from 'rxjs';
import { DishesOrdered } from '../models/dishes-ordered.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  URL: string = "https://localhost:44349/api";
  RestaurantId: number;
  constructor(private _http: HttpClient) { }
  setRestaurantId(id: number)
  {
    this.RestaurantId = id;
  }

  getRestaurantId()
  {
    return this.RestaurantId;
  }
//post
   postRestaurant(body: AllDetails )
   {
    return this._http.post(this.URL + '/Restaurant/allrestaurants', body);
   }
   //put
   putRestaurant(id:number, body: AllDetails)
   {
     return this._http.put(this.URL + '/Restaurant/editrestaurant/' + id , body);
   }
   //post
   postDishes(id : number , body: DishesOrdered)
   {
     return this._http.post(this.URL + '/Restaurant/newdish/' + id , body);
   }
   //delete
   removeDishes(id: number)
   {
     return this._http.delete(this.URL + '/Restaurant/menu/dishes/' + id);
   }
}
