import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  errors: string;  
  isRequesting: boolean;
  submitted: boolean = false;
  user: User;
  constructor(private userService: UserService, private _router: Router) { }

  ngOnInit() {
  }
  registerUser({ valid }: {  valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if(valid)
    {
        this.userService.register(this.user.email, this.user.password, this.user.userName)
                  .subscribe(
                    result  => {if(result){
                        this._router.navigate(['/login'],{queryParams: {brandNew: true}});                         
                    }},
                    errors =>  this.errors = errors);
    }      
  }
}
