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
import { EditResolver } from './shared/edit-resolver.service';
import { AddDishesComponent } from './admin/add-dishes/add-dishes.component';
import { MenuResolver } from './shared/menu-resolver.service';


const routes: Routes = [

  { path: 'all-restaurants' , component:AllRestaurantsComponent},
  { path: 'menu/:id', component:MenuComponent, resolve: {resolvedData: MenuResolver}, runGuardsAndResolvers: 'always'},
  { path: 'details/:id', component:DetailsComponent},
  { path: 'cart/:id', component:CartComponent},
  { path: 'add-restaurant', component:AddRestaurantComponent},
  { path: 'edit-restaurant/:id', component:EditRestaurantComponent, resolve: {resolvedData: EditResolver}},
  { path: 'add-dishes/:id', component:AddDishesComponent},
  { path: '', component:AllRestaurantsComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    }),
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
