import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRestaurantsComponent } from './all-restaurants/all-restaurants.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AllRestaurantsComponent,
    DetailsComponent,
    MenuComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class RestaurantsModule { }
