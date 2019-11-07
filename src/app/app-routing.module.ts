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
import { EditResolver } from './shared/services/edit-resolver.service';
import { AddDishesComponent } from './admin/add-dishes/add-dishes.component';
import { MenuResolver } from './shared/services/menu-resolver.service';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { AuthGuard } from './auth.guard';
import { ReviewsComponent } from './restaurants/reviews/reviews.component';


const routes: Routes = [

  { path: 'all-restaurants' , component:AllRestaurantsComponent, canActivate: [AuthGuard]},
  { path: 'menu/:id', component:MenuComponent, resolve: {resolvedData: MenuResolver}, runGuardsAndResolvers: 'always', canActivate: [AuthGuard]},
  { path: 'details/:id', component:DetailsComponent, canActivate: [AuthGuard]},
  { path: 'cart/:id', component:CartComponent,canActivate: [AuthGuard]},
  { path: 'add-restaurant', component:AddRestaurantComponent, canActivate: [AuthGuard]},
  { path: 'edit-restaurant/:id', component:EditRestaurantComponent, resolve: {resolvedData: EditResolver}, canActivate: [AuthGuard]},
  { path: 'add-dishes/:id', component:AddDishesComponent, canActivate: [AuthGuard]},
  { path: 'login-form', component:LoginFormComponent},
  { path: 'registration-form', component:RegistrationFormComponent},
  { path: 'add-dishes/:id/reviews', component:ReviewsComponent},
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
