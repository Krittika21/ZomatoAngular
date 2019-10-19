import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/restaurant.service';
import { Router } from '@angular/router';
import { AllRestaurants } from 'src/app/shared/AllRestaurants.model';
import { AllLocation } from 'src/app/shared/AllLocations.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  restaurant: Array<AllRestaurants>;
  location: Array<AllLocation>;
  constructor(private RestaurantService: RestaurantService, 
    private _router : Router) { }

  ngOnInit() {
    this.RestaurantService.getRestaurantLocation().subscribe(
    (result: Array<AllLocation>) => {
      this.location = result;
      console.log(result);
    },
    err => {
      console.log(err);
    }
  );
  }

}
