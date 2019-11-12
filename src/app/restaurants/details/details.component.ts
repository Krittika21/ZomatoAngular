import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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

  details: AllDetails;
  RestaurantId: number;
  currentUser: User;
  isAdmin: boolean;
  reviewed : boolean;

  constructor(private RestaurantService: RestaurantService, 
    private _router : Router, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) { 
      this.RestaurantId = +this.route.snapshot.paramMap.get('id');
         
    }

    forEdit(): void {
      this._router.navigate(['edit-restaurant', this.RestaurantId]);
    }
    fetchData() {
      this.RestaurantService.getRestaurantLocation(this.RestaurantId).subscribe(
        k => {
          this.details = k;
          this.changeDetector.detectChanges();
        }
      );
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
    onLike( ReviewId: number)
    {
      const review = new Review();
      review.ReviewId = ReviewId;
      review.userID = this.currentUser.id;
      review.restaurantID = this.RestaurantId;
      this.RestaurantService.postLikes(review).subscribe(
        result => {
          console.log(result);
        },
        err =>{
          console.log(err);
        }
      );
      this.fetchData();
    }

    addComment(ReviewId: number)
    {
      // const review = new Review();
      // const addtexts = review.commentACs;
      // addtexts.
      // addComment.userID = this.currentUser.id;
      // addComment.restaurantID = this.RestaurantId;
      const addtexts = new Comment();
      this.RestaurantService.postComments(addtexts).subscribe(
        result => {
          console.log(result);
        },
        err => {
          console.log(err);
        }
      )
    }

  ngOnInit() {
    this.RestaurantId = +this.route.snapshot.paramMap.get('id');
    this.details = this.route.snapshot.data.resolvedData;
    console.log(this.details);
    this.isAdmin = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const x = this.details.AllReviews.find(k => k.userID === this.currentUser.id);
      if(x !== undefined)
      {
        this.reviewed = true;
      }
      else
      {
        this.reviewed = false;
      }
      if(this.currentUser !== null)
      {
        if(this.currentUser.role.toString() === 'admin')
        {
          console.log(this.currentUser.role);
          this.isAdmin = true;
        }
      } 
  }
}
