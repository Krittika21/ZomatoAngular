import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllDishes } from '../models/AllDishes.model';
import { AllRestaurants } from '../models/AllRestaurants.model';
import { AllDetails } from '../models/AllDetails.model';
import { Review } from '../models/review.model';
import { Comments } from '../models/comments.model';

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

  getRestaurantLocation(id:number): Observable<AllDetails>
  {
    return this._http.get<AllDetails>(this.URL + '/Restaurant/restaurant/'+ id);
  }
  
  getDishes(id: number): Observable<AllDishes[]>
  {
    return this._http.get<AllDishes[]>(this.URL + '/Restaurant/restaurant/dishes/' + id);
  }

  removeRestaurant(RestaurantId: number):Observable<AllRestaurants>
  {
    return this._http.delete<AllRestaurants>(this.URL + '/Restaurant/restaurant/' + RestaurantId);
  }

  addReview(body: Review)
  {
    return this._http.post(this.URL + '/Restaurant/reviews/' + body.restaurantID, body);
  }

  postLikes(body: Review)
  {
    return this._http.post(this.URL + '/Restaurant/reviewsLikes/' + body.restaurantID, body);
  }

  postComments(body: Comments, RestaurantId: number)
  {
    return this._http.post(this.URL + '/Restaurant/comment/' + RestaurantId, body);
  }
}
