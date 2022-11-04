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
  retrievedImage: any;
  base64Data: any;
  constructor(
    private formBuilder: FormBuilder,private route:Router,private _service:DigitalBooksService
  ) {}

  ngOnInit(): void {
  }

 
  onSubmit(): void {
    console.log(this.book);
  this._service.searchBookFromRemote(this.book).subscribe(
    data=>{
      console.log("response received",data,this.showBookDetails)
      this.showBookDetails = true
      this.bookDetails = data
     
      if(this.bookDetails.length>0){
        for(let i=0; i<this.bookDetails.length;i++){
         this.base64Data = this.bookDetails[i].picByte;
         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
         this.bookDetails[i].picByte=this.retrievedImage;
        }
      }
    },
    error=>{alert("No Book found for this search criteria!!");
    this.showBookDetails = false;
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
