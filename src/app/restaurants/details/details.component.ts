import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AllRestaurants } from 'src/app/shared/AllRestaurants.model';
import { AllDetails } from 'src/app/shared/AllDetails.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AllCity } from 'src/app/shared/OrderDetails.model';
import { AllCountry } from 'src/app/shared/AllCountry.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  //restaurant: Array<AllRestaurants>;
  details: Array<AllDetails>;
  RestaurantId: number;
  constructor(private RestaurantService: RestaurantService, 
    private _router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.RestaurantId = +this.route.snapshot.paramMap.get('id');
    this.RestaurantService.getRestaurantLocation(this.RestaurantId).subscribe(
    (result: Array<AllDetails>) => {
      this.details = result;
      console.log(result);
    },
    err => {
      console.log(err);
    }
  );
  }

}
