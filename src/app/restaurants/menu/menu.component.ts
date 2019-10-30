import { Component, OnInit } from '@angular/core';
import { AllDishes } from 'src/app/shared/AllDishes.model';
import { RestaurantService } from 'src/app/shared/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantAC } from 'src/app/shared/RestaurantAC.model';
import { AllRestaurants } from 'src/app/shared/AllRestaurants.model';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  RestaurantId: number;
  eatery: AllRestaurants[];
  dishes: AllDishes[];
  selectedDishes: AllDishes[];
  currentRestaurant: AllRestaurants;
  constructor(private RestaurantService: RestaurantService, private adminService : AdminService,
    private _router : Router, private route: ActivatedRoute) {
      this.selectedDishes=[];
      this.RestaurantId = +this.route.snapshot.paramMap.get('id');
      this.eatery = this.route.snapshot.data.resolvedData;
      this.currentRestaurant = this.eatery.find(k=>k.ID  == this.RestaurantId);      
    }

    forCart(RestaurantId: number): void 
    {
       this._router.navigate(["/cart/"+ RestaurantId], {state:{food: this.selectedDishes}})
    }
    addDishes(): void {
      this._router.navigate(["/add-dishes/"+ this.RestaurantId]);
    }
    deleteDishes(id: number): void {
      this.adminService.removeDishes(id).subscribe(
        result => {
          this._router.navigate(["/menu/" + this.RestaurantId]);
        },
        err => {
          console.log(err);
        }
      )
    }

  ngOnInit() {
    
    this.RestaurantService.getDishes(this.RestaurantId).subscribe(
      (result) => {
        this.dishes = result;
        console.log(result);
      },
      err=> {
        console.log(err);
      }
    );

  }

  onCheck(check:boolean, ID: number) {
    if(check === true) {
      this.selectedDishes.push(this.dishes.find(k => k.ID == ID));
    } else {
      this.selectedDishes = this.selectedDishes.filter(k => k.ID !=ID);
    }
    console.log(this.selectedDishes);
  }

}
