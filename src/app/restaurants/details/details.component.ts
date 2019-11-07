import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AllDetails } from 'src/app/shared/models/AllDetails.model';
import { User } from 'src/app/shared/models/user.model';
import { Review } from 'src/app/shared/models/review.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details: Array<AllDetails>;
  RestaurantId: number;
  currentUser: User;
  isAdmin: boolean;
  
  constructor(private RestaurantService: RestaurantService, 
    private _router : Router, private route: ActivatedRoute) { 
      this.RestaurantId = +this.route.snapshot.paramMap.get('id');
      this.isAdmin = false;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(this.currentUser !== null)
      {
        if(this.currentUser.role.toString() === 'admin')
        {
          console.log(this.currentUser.role);
          this.isAdmin = true;
        }
      }    
    }

    forEdit(): void {
      this._router.navigate(['edit-restaurant', this.RestaurantId]);
    }
    forDelete(): void{
      this.RestaurantService.removeRestaurant(this.RestaurantId).subscribe(
        result => {
          console.log(result);
          this._router.navigate(["/all-restaurants"]);
        },
        err =>
        {
          console.log(err);
        }
      )
    }
    addReview()
    {
      this._router.navigate(["add-dishes/" + this.RestaurantId + "/reviews"]);
    }
    onLike()
    {
      
    }

  ngOnInit() {
    this.RestaurantId = +this.route.snapshot.paramMap.get('id');
    this.RestaurantService.getRestaurantLocation(this.RestaurantId).subscribe(
    (result: Array<AllDetails>) => {
      this.details = result;
      console.log(result);
    },
    err => {
      console.log(err);
    }
  );
  }

}
