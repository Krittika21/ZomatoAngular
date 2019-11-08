import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, Routes, ActivatedRouteSnapshot } from '@angular/router';
import { RestaurantService } from './restaurant.service';
import { Observable } from 'rxjs';
import { AllDetails } from '../models/AllDetails.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailResolver implements Resolve<AllDetails> {

x: number;
  constructor(private restaurantService: RestaurantService) {
     }

     resolve(route: ActivatedRouteSnapshot) : Observable<AllDetails>{
        this.x = route.params['id']; 
        const y = this.restaurantService.getRestaurantLocation(this.x);
        return y;
    }
}
