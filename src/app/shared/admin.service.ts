import { Injectable } from '@angular/core';
import { AddRestaurantComponent } from '../admin/add-restaurant/add-restaurant.component';
import { DetailsComponent } from '../restaurants/details/details.component';
import { HttpClient } from '@angular/common/http';
import { AllDetails } from './AllDetails.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  URL: string = "https://localhost:44335/api";
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
}
