import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { DigitalBooksService } from '../digitalbooks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 user =new User();
 userRole =new User();
 response:any;
 msg:string='';
  constructor(private _service:DigitalBooksService, private _router:Router) { }

  ngOnInit(): void {
  }

  signinUser(){
this._service.signInUserFromRemote(this.user).subscribe(
  data =>{console.log("response received");
  this.response=data;
  console.log("user::"+this.response);
  sessionStorage.setItem(this.user.email,this.response);
  sessionStorage.setItem('user_email',this.user.email);
//this._router.navigate(['/user'])
this._service.getUserRoleFromRemote(this.user.email,this.response).subscribe(
  data=>{this.userRole=data;
  if(this.userRole.role=="Author"){
  this._router.navigate(['/user']);
  }
  else if(this.userRole.role=="Reader"){
    this._router.navigate(['/reader']);
  }
  }
)
},
  error =>{console.log("exception occured");
  console.log(this.user);
this.msg="BAD CREDENTIALS"}
)

  }
  signupUser(){
    this._router.navigate(['/signup'])
  }
}
