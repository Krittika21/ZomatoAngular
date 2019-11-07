import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRestaurantsComponent } from './all-restaurants/all-restaurants.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Authorization } from '../shared/Interceptor/authorization.interceptor';
import { ReviewsComponent } from './reviews/reviews.component';



@NgModule({
  declarations: [
    AllRestaurantsComponent,
    DetailsComponent,
    MenuComponent,
    CartComponent,
    ReviewsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: Authorization, multi:true
    }]
})
export class RestaurantsModule { }
