import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Review } from 'src/app/shared/models/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  RestaurantId: number;
  allReviews : Review;

  constructor(private RestaurantService: RestaurantService, 
    private _router : Router, private route: ActivatedRoute) {
      this.RestaurantId = +this.route.snapshot.paramMap.get('id');
     }


  postReview()
  {
    this.RestaurantService.addReviews(this.RestaurantId,this.allReviews).subscribe(
      result => {
        console.log(result);
        debugger;
        this._router.navigate(["/details/" + this.RestaurantId]);
      },
      err => {
        console.log(err);
      }
    )
    
  }

  ngOnInit() {
  }

}
