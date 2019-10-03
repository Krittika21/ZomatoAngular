import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRestaurantsComponent } from './all-restaurants/all-restaurants.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AllRestaurantsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RestaurantsModule { }
