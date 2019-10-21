import { Component, OnInit } from '@angular/core';
import { AllDishes } from 'src/app/shared/AllDishes.model';
import { RestaurantService } from 'src/app/shared/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantAC } from 'src/app/shared/RestaurantAC.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dishes: Array<RestaurantAC>;
  RestaurantId: number;

  constructor(private RestaurantService: RestaurantService,
    private _router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.RestaurantId = +this.route.snapshot.paramMap.get('id');
    this.RestaurantService.getDishes(this.RestaurantId).subscribe(
      (result: Array<RestaurantAC>) => {
        this.dishes = result;
        console.log(result);
      },
      err=> {
        console.log(err);
      }
    );

  }

}
