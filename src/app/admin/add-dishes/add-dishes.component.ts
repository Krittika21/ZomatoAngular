import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AllRestaurants } from 'src/app/shared/models/AllRestaurants.model';
import { DishesOrdered } from 'src/app/shared/models/dishes-ordered.model';

@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.css']
})
export class AddDishesComponent implements OnInit {
  restaurant: AllRestaurants;
  dish : DishesOrdered;
  RestaurantId: number;

  constructor(private adminService: AdminService, private _router: Router, private route: ActivatedRoute) { 
    this.dish = new DishesOrdered();
    this.RestaurantId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    
  }
  onSubmit()
  {
    debugger
    this.adminService.postDishes(this.RestaurantId, this.dish).subscribe(
      result => {
        console.log(result);
        debugger;
        this._router.navigate(["/menu/" + this.RestaurantId])
      },
      err => {
        console.log(err);
      }
    )
  }
}
