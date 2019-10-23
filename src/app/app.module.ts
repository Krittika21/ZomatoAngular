import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AllRestaurantsComponent } from './restaurants/all-restaurants/all-restaurants.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AddRestaurantComponent } from './admin/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './admin/edit-restaurant/edit-restaurant.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [ AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RestaurantsModule,
    AdminModule,
    AppRoutingModule
    
    
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
