import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  constructor(private adminService: AdminService,
    private _router: Router) { }

  ngOnInit() {
  }
  onSubmit()
  {    
    /* this.adminService.postRestaurant(this.test).subscribe(
      result => {
        console.log(result);
        this._router.navigate(["/test-details"]);
      },
      err => {
        console.log(err);
      }); */
  }

}
