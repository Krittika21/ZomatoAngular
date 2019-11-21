import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AllRestaurants } from 'src/app/shared/models/AllRestaurants.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { User } from 'src/app/shared/models/user.model';
import { DishesOrdered } from 'src/app/shared/models/dishes-ordered.model';
import { Dishes } from 'src/app/shared/models/dishes.model';
import { OrderDetails } from 'src/app/shared/models/OrderDetails.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  RestaurantId: number;
  eatery: AllRestaurants[];
  dishes: Dishes[];
  selectedDishes: DishesOrdered[];
  selectedDish: DishesOrdered;
  currentRestaurant: AllRestaurants;
  currentUser: User;
  isAdmin: boolean;
  totals: number[];
  addItem: boolean;
  ItemsCount: number[];

  constructor(private RestaurantService: RestaurantService, private adminService: AdminService,
    private _router: Router, private route: ActivatedRoute) {
    this.selectedDishes = [];
    this.totals = [];
    this.addItem = true;
    this.ItemsCount = [];
    this.selectedDish = new DishesOrdered();
    this.RestaurantId = +this.route.snapshot.paramMap.get('id');
    this.eatery = this.route.snapshot.data.resolvedData;
    this.currentRestaurant = this.eatery.find(k => k.ID == this.RestaurantId);
    this.isAdmin = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser !== null) {
      if (this.currentUser.role.toString() === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  forCart(RestaurantId: number): void {
    let flag = 0;
    if(this.selectedDishes.length === 0) {
      flag = 1;
      
    }
    for(const x of this.selectedDishes) {
      if (x.ItemsCount === 0 || x.ItemsCount === undefined) {
        flag = 1;
        break;
      }
    } 
    if (flag === 0) {
      this.addItem = true;
      this._router.navigate(["/cart/" + RestaurantId], { state: { food: this.selectedDishes, } })
    } else {
        this.addItem = false;
    }
  }
  addDishes(): void {
    this._router.navigate(["/add-dishes/" + this.RestaurantId]);
  }
  deleteDishes(id: number): void {
    this.adminService.removeDishes(id).subscribe(
      result => {
        this._router.navigateByUrl('/', { skipLocationChange:true}).then(() => {
          this._router.navigate(['/menu/', this.RestaurantId]);
        })
      },
      err => {
        console.log(err);
      }
    )
  }
  onChange(x: number, i: number) {
    const y = this.selectedDishes.find(k => k.ID === x );
    console.log(y);
    if (y !== undefined) {
      y.ItemsCount = i;
    }
  }
  ngOnInit() {

    this.RestaurantService.getDishes(this.RestaurantId).subscribe(
      (result) => {
        this.dishes = result;
        this.dishes.forEach(element => {
          this.totals.push(element.Costs);
        });
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );

  }

  // onCheck(check: boolean, ID: number) {
  //   console.log(ID);
  //   console.log(this.selectedDishes)
  //   if (check === true) {
  //     //console.log(ID);
  //     const x = this.dishes.find(k => k.ID == ID);
  //     const y = this.dishes.findIndex(k => k.ID == x.ID);
  //     this.selectedDish.ID = x.ID;
  //     if(this.ItemsCount[y] !== undefined) {
  //       this.selectedDish.ItemsCount = this.ItemsCount[y];
  //     } else {
  //       this.selectedDish.ItemsCount = 0;
  //     }
  //     this.selectedDish.ItemsCount = this.ItemsCount[y];
  //     this.selectedDish.Dishes = x;
  //     this.selectedDishes.push(this.selectedDish);
  //   } else {
  //     //this.selectedDishes = this.selectedDishes.filter(k => k.ID != ID);
  //   }
  //   console.log(this.selectedDishes);
  // }
  onCheck(check: boolean, ID: number) { 
    console.log(ID);
    console.log(check);
    if (check === true) {
      var dish = this.dishes.find(k => k.ID === ID);
      const y = this.dishes.findIndex(k => k.ID == ID);
      this.selectedDish.ID = dish.ID;
      this.selectedDish.Dishes = dish;
      this.selectedDish.ItemsCount = this.ItemsCount[y];
      this.selectedDishes.push(this.selectedDish);
      this.selectedDish = new DishesOrdered();
    } else {
      this.selectedDishes = this.selectedDishes.filter(k => k.ID != ID);
    }
    
    console.log(this.selectedDishes);
  }

}
