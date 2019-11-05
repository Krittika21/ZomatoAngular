import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Router } from '@angular/router';
import { AllRestaurants } from 'src/app/shared/models/AllRestaurants.model';
import { UserService } from 'src/app/shared/services/user.service';

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
  isAuthenticated: boolean;

  constructor (private RestaurantService: RestaurantService, private userService: UserService,
    private _router : Router) { }
    
  forDetails(RestaurantId: number): void {
    this._router.navigate(["/details/"+ RestaurantId]);
  }
  forMenu(RestaurantId: number): void {
    this._router.navigate(["/menu/" + RestaurantId], {state:{eatery: this.restaurant}});
  }
  forAdd(): void {
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
  Logout() {
    this.userService.LogOut();
  }
  isLoggedIn() {
    this.isAuthenticated = this.userService.isLoggedIn();
  }
}
