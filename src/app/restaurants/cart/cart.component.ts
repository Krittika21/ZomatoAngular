import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AllDishes } from 'src/app/shared/AllDishes.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  selected: AllDishes[];
  constructor(private _router : Router, private route: ActivatedRoute) 
  { 
    this.selected = this._router.getCurrentNavigation().extras.state.food;
    console.log(this.selected);
  }

  ngOnInit() {
  }

}
