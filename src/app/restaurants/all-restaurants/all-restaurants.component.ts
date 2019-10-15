import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrls: ['./all-restaurants.component.css']
})
export class AllRestaurantsComponent implements OnInit {
  id : number
  RestaurantName : string;
  Location : string;
  Dishes : string;

  constructor (private RestaurantService: RestaurantService, private _router : Router) {
    
  }
    

  ngOnInit() {
    this.RestaurantService;
  }

}
