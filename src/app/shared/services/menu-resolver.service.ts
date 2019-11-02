import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute } from '@angular/router';
import { AllRestaurants } from '../models/AllRestaurants.model';
import { RestaurantService } from './restaurant.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuResolver implements Resolve<AllRestaurants[]> {


  constructor(private restaurantService: RestaurantService, 
    private _router : Router, private route: ActivatedRoute) {
      
     }
     resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) : Observable<AllRestaurants[]>{
      const y = this.restaurantService.getAllRestaurants();
      return y;
    }
}
