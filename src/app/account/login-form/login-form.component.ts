import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from 'src/app/shared/models/credentials.interface';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { email: '', password: '' };
  user: User;
  constructor(private userService: UserService, private _router: Router, private activatedRoute: ActivatedRoute) {
    this.user = new User();
   }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
         this.brandNew = param['brandNew'];   
         this.credentials.email = param['email'];         
      });
  }
 

  login() 
  {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
      this.userService.logIn(this.user.email, this.user.password)
        .subscribe(
        result => {         
          if (result) {
             this.isRequesting = false;
             this._router.navigate(['/all-restaurants']);             
          }
        },
        error => this.errors = error);
    }
}

