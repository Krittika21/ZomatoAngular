import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/restaurant.service';
import { Router } from '@angular/router';
import { AllRestaurants } from 'src/app/shared/AllRestaurants.model';

@Component({
  selector: 'all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrls: ['./all-restaurants.component.css']
})
export class AllRestaurantsComponent implements OnInit {
  restaurant: Array<AllRestaurants>;
  id : number;
  RestaurantName : string;
  Location : string;
  Dishes : string;

  constructor (private RestaurantService: RestaurantService, 
    private _router : Router) { }
    
  forDetails(RestaurantId: number): void {
    this._router.navigate(["/details/"+ RestaurantId]);
  }
  forMenu(RestaurantId: number): void {
    this._router.navigate(["/menu/" + RestaurantId], {state:{eatery: this.restaurant}});
  }
  forAdd(RestaurantId: number): void {
    this._router.navigate(["/add-restaurant" ]);
  }
  ngOnInit() {
    this.RestaurantService.getAllRestaurants().subscribe(
      (result: Array<AllRestaurants>) => {
        this.restaurant = result;
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }
}
