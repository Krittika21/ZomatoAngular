import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { DishesOrdered } from 'src/app/shared/models/dishes-ordered.model';
import { User } from 'src/app/shared/models/user.model';
import { NotifyAdminService } from 'src/app/shared/services/notify-admin.service';

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
  total: number;
  constructor( private RestaurantService : RestaurantService, private _router : Router, private route: ActivatedRoute, private _signalr: NotifyAdminService) 
  { 
    this.selected = this._router.getCurrentNavigation().extras.state.food;
    this.RestaurantId = +this.route.snapshot.paramMap.get('id');
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.order = new Cart();
    this.total = 0;
    console.log(this.selected);
    this.selected.forEach(element => {
      this.total += element.Dishes.Costs * element.ItemsCount;      
    });
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
          this.user = JSON.parse(localStorage.getItem('currentUser'));
          this._signalr.SendNotification('success', this.user.fullName + ' ' + 'placed an order!');
          console.log(result);
      },
      err => {
        console.log(err);
      });
  }

  updateCart(orderId :number)
  {
    this.selected = this.selected.filter(k => k.ID !== orderId);
  }

  ngOnInit() {

  }

}
