import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { DigitalBooksService } from '../digitalbooks.service';
import { User } from '../user';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Booksubscription } from '../booksubscription';
import { Subscription } from '../subscription';
import { MatDialog } from '@angular/material/dialog';
import { ViewcomponentComponent } from '../viewcomponent/viewcomponent.component';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(
    private _service: DigitalBooksService,
    private formBuilder: FormBuilder, private route:Router,private dialog:MatDialog
  ) {}
  searchForm!: FormGroup;
  isSubscribed: boolean = false;
  isAddedBookForm:boolean = false
  showBookDetails: boolean = false;
  save!: boolean;
  idGen: any;
  bookArray!:Book[];
  subscribedBookArray!:Book[];
  bookSubscriptionArray!:Booksubscription[];
  subscriptionArray!:Subscription[];
  book=new Book();
  subscription=new Subscription();
  bookId!:number;
  content!:Book;
  isSearcBookFormEnabled:boolean = false;
  isSubscribedShowBookDetails: boolean =false;

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
    });
    this.isSearcBookFormEnabled=false;
    this.isSubscribedShowBookDetails=false;
    this.showBookDetails=false;
  }
  logout(): void {
    this.route.navigate(['/search']);
    sessionStorage.clear();
    console.log("logout button clicked");

  }

  searchBookFormOpen(){
    this.isSearcBookFormEnabled = true;
    this.isSubscribedShowBookDetails=false;
    this.showBookDetails=false;
  }


   searchBook(){
     this.isSubscribedShowBookDetails=false;
    if(this.searchForm.controls['title'].value!=null){
      this.book.title=this.searchForm.controls['title'].value;
    }
    if(this.searchForm.controls['category'].value!=null){
      this.book.category=this.searchForm.controls['category'].value;
    }
    if(this.searchForm.controls['author'].value!=null){
      this.book.author=this.searchForm.controls['author'].value;
    }
   
    this._service.searchBookForReaderFromRemote(this.book).subscribe(
      data => {
        console.log("response received", data);
        this.bookArray = data;
        console.log(this.bookArray);
        this.isSearcBookFormEnabled=false;
        this.showBookDetails = true;
        this.searchForm.reset();
      },
      error=>{
        alert("No Book Found for this search criteria !!");
        this.isSearcBookFormEnabled=false;
        this.showBookDetails=false;
        this.searchForm.reset();
      }
    );
    
  
  
  } 

  
  public viewContent(id:number){
    
    let user_email=sessionStorage.getItem("user_email");
    

    let token=sessionStorage.getItem(`${user_email}`);
   

    this._service.viewContentFromRemote(id,token).subscribe(
      data=> {
        
        console.log("response received", data);
        this.content = data;
        this.dialog.open(ViewcomponentComponent,{
          width:'330px',
          height:'400px',
          data:this.content.content
          
        });
      }
    );
    
  }

  public subscribe(id:number){
    let user_email=sessionStorage.getItem("user_email");
    let token=sessionStorage.getItem(`${user_email}`);
    for (let i = 0; i < this.bookArray.length; i++) {
      if (this.bookArray[i].id === id) {
        this.bookArray.splice(i,1);
        this._service.subscribeBookFromRemote(id,token).subscribe(
          data => {
            console.log("response received", data);
            alert("Book is successfully subscribed!");
          },error=>{
            alert("Book is not subscribed!!");
          }
        );
      }
    }
    
  }
  public unsubscribe(id:number){
    let user_email=sessionStorage.getItem("user_email");
    let token=sessionStorage.getItem(`${user_email}`);
    for (let i = 0; i < this.subscribedBookArray.length; i++) {
      if (this.subscribedBookArray[i].id === id) {
        this.subscribedBookArray.splice(i,1);
        this._service.unsubscribeBookFromRemote(id,token).subscribe(
          data => {
            console.log("response received", data);
           alert("Book is successfully unsubscribed!");
          }
        );
      }
    }
    
  }
  viewSubscribedBooks(){

    this.isSearcBookFormEnabled=false;
    this.showBookDetails=false;
    let user_email=sessionStorage.getItem("user_email");
    let token=sessionStorage.getItem(`${user_email}`);
    this._service.viewSubscribedBooks(user_email,token).subscribe(
      data=>{
        this.subscribedBookArray=data;
        this.isSubscribedShowBookDetails=true;
        this.isSubscribed=true;
      },
      error =>{
        alert("No subscribed books for you !!");
        this.isSubscribedShowBookDetails=false;
      }
    );

  }
}
