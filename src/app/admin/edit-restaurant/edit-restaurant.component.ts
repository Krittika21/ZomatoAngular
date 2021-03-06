import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { AllDetails } from 'src/app/shared/models/AllDetails.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  RestaurantId: number;
  restaurant: AllDetails;
  constructor(private adminService: AdminService, 
    private _router : Router, private route: ActivatedRoute) { 
    this.restaurant = this.route.snapshot.data.resolvedData;
    this.RestaurantId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  onSubmit(){
    this.adminService.putRestaurant(this.RestaurantId,this.restaurant).subscribe(
      result => {
        console.log(result);
        this._router.navigate(["/details/"+ this.RestaurantId]);
      },
      err => {
        console.log(err);
      }
    );
  }

}
