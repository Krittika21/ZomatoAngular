import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { DishesOrdered } from 'src/app/shared/models/dishes-ordered.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  selected: DishesOrdered[];
  order : Cart;
  public orderPlaced = false;
  RestaurantId: number;
  user : User;

  constructor( private RestaurantService : RestaurantService, private _router : Router, private route: ActivatedRoute) 
  { 
    this.selected = this._router.getCurrentNavigation().extras.state.food;
    this.RestaurantId = +this.route.snapshot.paramMap.get('id');
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.order = new Cart();
    console.log(this.selected);
  }

  placeOrder()
  {
    this.order.RestaurantID = this.RestaurantId;
    this.order.UserID = this.user.id;
    this.user.userName = this.user.userName;
    this.order.DishesOrdered = this.selected;
    console.log(this.order);
    this.order.DishesOrdered.forEach(element => {
      element.ID = undefined;
    });
    this.RestaurantService.postOrder(this.order).subscribe(
      result => {
        setTimeout(() => {
          this.orderPlaced = true
          }, 3000)
        console.log(result);
      },
      err => {
        console.log(err);
      });
  }

  updateCart(orderId :number)
  {
    this.selected = this.selected.filter(k => k.ID !== orderId);
    // this.RestaurantService.editCart(orderId, this.order).subscribe(
    //   result => {
    //     console.log(result);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
  }

  ngOnInit() {
  }

}
