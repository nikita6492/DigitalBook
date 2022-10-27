import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DigitalBooksService } from '../digitalbooks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user =new User();
  msg='';
   constructor(private _service:DigitalBooksService, private _router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._service.signUpUserFromRemote(this.user).subscribe(
      data =>{console.log("response received");
    console.log(this.user);
    alert("Congratulations!! Account Created.");
  this._router.navigate(['/login'])},
  error=>{console.log("exception occured");
  alert("Account not created!");
  this._router.navigate(['/signup']);
  this.msg="Account not created!"}
  
    )
  }
  
}
