import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRestaurantsComponent } from './restaurants/all-restaurants/all-restaurants.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './restaurants/menu/menu.component';
import { DetailsComponent } from './restaurants/details/details.component';
import { CartComponent } from './restaurants/cart/cart.component';
import { AddRestaurantComponent } from './admin/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './admin/edit-restaurant/edit-restaurant.component';


const routes: Routes = [

  { path: 'all-restaurants' , component:AllRestaurantsComponent},
  { path: 'menu/:id', component:MenuComponent},
  { path: 'details/:id', component:DetailsComponent},
  { path: 'cart/:id', component:CartComponent},
  { path: 'add-restaurant/:id', component:AddRestaurantComponent},
  { path: 'edit-restaurant/:id', component:EditRestaurantComponent},
  { path: '', component:AllRestaurantsComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
