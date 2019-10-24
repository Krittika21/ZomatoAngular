import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { FormsModule } from '@angular/forms';
import { AddDishesComponent } from './add-dishes/add-dishes.component';



@NgModule({
  declarations: [
      AddRestaurantComponent,
      EditRestaurantComponent,
      AddDishesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminModule { }
