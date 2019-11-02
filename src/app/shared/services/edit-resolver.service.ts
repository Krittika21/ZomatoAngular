import { Injectable } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { Router, ActivatedRoute, Resolve } from '@angular/router';
import { AllDetails } from '../models/AllDetails.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditResolver  implements Resolve<AllDetails>{
  

  constructor(private restaurantService: RestaurantService, 
    private _router : Router, private route: ActivatedRoute) {
      
     }
     resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) : any{
      const x = +route.params['id'];
      console.log(x);
      const y = this.restaurantService.getRestaurantLocation(x);
      console.log(y);
      return y;
    }
}
