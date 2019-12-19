import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Router } from '@angular/router';
import { AllDetails } from 'src/app/shared/models/AllDetails.model';
import { AllCity } from 'src/app/shared/models/AllCity.model';
import { AllCountry } from 'src/app/shared/models/AllCountry.model';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  restaurant: AllDetails;
  RestaurantId: number;
  cityName: string;
  countryName: string;
  constructor(private adminService: AdminService, private restaurantService: RestaurantService,
    private _router: Router) {
      this.restaurant = new AllDetails();
      
     }

  ngOnInit() { 
  }
  onSubmit()
  {
    this.restaurant.City = new AllCity();
    this.restaurant.Country = new AllCountry();
    this.restaurant.City.CityName = this.cityName;
    this.restaurant.Country.CountryName = this.countryName;
    console.log(this.restaurant);
    this.adminService.postRestaurant(this.restaurant).subscribe(
      result => {
        console.log(result);
        this._router.navigate(["/all-restaurants"]);
      },
      err => {
        console.log(err);
      }); 
  }

}
