import { Component, OnInit } from '@angular/core';
import { AllDishes } from 'src/app/shared/models/AllDishes.model';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantAC } from 'src/app/shared/models/RestaurantAC.model';
import { AllRestaurants } from 'src/app/shared/models/AllRestaurants.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { User } from 'src/app/shared/models/user.model';

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
  currentUser: User;
  isAdmin: boolean;
  
  constructor(private RestaurantService: RestaurantService, private adminService : AdminService,
    private _router : Router, private route: ActivatedRoute) {
      this.selectedDishes=[];
      this.RestaurantId = +this.route.snapshot.paramMap.get('id');
      this.eatery = this.route.snapshot.data.resolvedData;
      this.currentRestaurant = this.eatery.find(k=>k.ID  == this.RestaurantId);   
      this.isAdmin = false;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(this.currentUser !== null)
      {
        if(this.currentUser.role.toString() === 'admin')
        {
          this.isAdmin = true;
        }
      }       
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
