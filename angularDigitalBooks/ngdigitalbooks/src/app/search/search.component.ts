import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book';
import { DigitalBooksService } from '../digitalbooks.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  book=new Book();
  showBookDetails: boolean = false;
  bookDetails: any;
  constructor(
    private formBuilder: FormBuilder,private route:Router,private _service:DigitalBooksService
  ) {}

  ngOnInit(): void {
  }

 
  onSubmit(): void {
  this._service.searchBookFromRemote(this.book).subscribe(
    data=>{
      console.log("response received",data,this.showBookDetails)
      this.showBookDetails = true
      this.bookDetails = data
      console.log(this.bookDetails,this.showBookDetails)
    }
  );
  }

  signUp(): void {
    this.route.navigate(['/signup']);
    console.log("signUp button clicked");
  }
  signIn(): void { 
    this.route.navigate(['/login']); 
    console.log("signIn button clicked");
  }

}
