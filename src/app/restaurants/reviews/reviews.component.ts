import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Review } from 'src/app/shared/models/review.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  RestaurantId: number;
  allReview : Review;
  user : User;

  constructor(private RestaurantService: RestaurantService, 
    private _router : Router, private route: ActivatedRoute) {
      this.RestaurantId = +this.route.snapshot.paramMap.get('id');
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.allReview = new Review();
     }


  postReview()
  {
    this.allReview.restaurantID = this.RestaurantId;
    this.allReview.LikesCount = 0;
    this.allReview.userID = this.user.id;
    this.allReview.UserName = this.user.fullName;
    this.RestaurantService.addReview(this.allReview).subscribe(
      result => {
        console.log(result);
        debugger;
        //this._router.navigate(["/details/" + this.RestaurantId]);
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this._router.navigate(['/details/'+ this.RestaurantId]);
      }); 
      },
      err => {
        console.log(err);
      }
    )
    
  }

  ngOnInit() {
  }

}
