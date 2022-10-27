import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { DigitalBooksService } from '../digitalbooks.service';
import { User } from '../user';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private _service: DigitalBooksService,
    private formBuilder: FormBuilder
  ) {}
  response: any;
  bookForm!: FormGroup;
  isEditEnabled: boolean = false;
  showBookDetails: boolean = false;
  save!: boolean;
  idGen: any;
  bookArray!:Book[];
  book=new Book();
  bookId!:number;
  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      title: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      price: ['', Validators.required],
      content: ['', Validators.required],
      active: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.save = false;
    let user_email=sessionStorage.getItem('user_email');
    let token=sessionStorage.getItem(`${user_email}`);  
    
   this._service.viewAddedBooks(user_email,token).subscribe(data=>{
     console.log(typeof data,data);
     this.bookArray=data;
    console.log(this.bookArray);
   })
  }

  public addBook(){
    this.book.title=this.bookForm.controls['title'].value;
    this.book.category=this.bookForm.controls['category'].value;
    this.book.author=this.bookForm.controls['author'].value;
    this.book.publisher=this.bookForm.controls['publisher'].value;
    this.book.price=this.bookForm.controls['price'].value;
    this.book.content=this.bookForm.controls['content'].value;
    this.book.active=this.bookForm.controls['active'].value;
    this.book.status=this.bookForm.controls['status'].value;
    let user_email=sessionStorage.getItem('user_email');
    this.book.authorEmail=`${user_email}`;
    let token=sessionStorage.getItem(`${user_email}`);
    console.log(token)
    this._service.addBookToRemote(this.book,token).subscribe(
    data=>{console.log(data);
    alert("Book is successfully added !!");
    this._service.viewAddedBooks(user_email,token).subscribe(data=>{
      console.log(typeof data,data);
      this.bookArray=data;
     console.log(this.bookArray);
    })}
    )
    this.showBookDetails = true;
      this.bookForm.reset();
  }
  public editBook(book:Book){
    this.save=true;
    this.isEditEnabled=false;
    console.log(this.bookArray?.length)
    for (let i = 0; i < this.bookArray?.length; i++) {
      if (this.bookArray[i].id === book.id) {
        this.bookId=book.id;
        console.log(this.bookArray[i]);
        
        this.bookForm.patchValue({
          title: this.bookArray[i].title,
          category: this.bookArray[i].category,
          author: this.bookArray[i].author,
          publisher: this.bookArray[i].publisher,
          price: this.bookArray[i].price,
          content:this.bookArray[i].content,
          active:this.bookArray[i].active,
          status:this.bookArray[i].status
        });
        console.log(this.bookForm)
      }
    }    
  }

  public deleteBook(id:any){
    let user_email=sessionStorage.getItem('user_email');
    this.book.authorEmail=`${user_email}`;
    let token=sessionStorage.getItem(`${user_email}`);
    console.log(token)
    for (let i = 0; i < this.bookArray?.length; i++) {
      if (this.bookArray[i].id === id) {
        this.bookArray.splice(i,1);
        this._service.deleteBookFromRemote(id,token).subscribe(
          data=>alert("Book is successfully deleted!")
        );
      }
    }
  }

  public unblock(id:any){
    let user_email=sessionStorage.getItem('user_email');
    this.book.authorEmail=`${user_email}`;
    let token=sessionStorage.getItem(`${user_email}`);
    console.log(token)
    for (let i = 0; i < this.bookArray?.length; i++) {
      if (this.bookArray[i].id === id) {
        this.bookArray[i].status="unblock";
        this._service.unblockBookFromRemote(id,token).subscribe(
          data=>alert("Book is successfully unblocked!")
        );
      }
    }
  }
  public block(id:any){
    let user_email=sessionStorage.getItem('user_email');
    this.book.authorEmail=`${user_email}`;
    let token=sessionStorage.getItem(`${user_email}`);
    console.log(token)
    for (let i = 0; i < this.bookArray?.length; i++) {
      if (this.bookArray[i].id === id) {
        this.bookArray[i].status="block";
        this._service.blockBookFromRemote(id,token).subscribe(
          data=>alert("Book is successfully blocked!")
        );
      }
    }
  }
  public saveBook(){
    this.save=false;
    this.book.id=this.bookId;
    this.book.title=this.bookForm.controls['title'].value;
    this.book.category=this.bookForm.controls['category'].value;
    this.book.author=this.bookForm.controls['author'].value;
    this.book.publisher=this.bookForm.controls['publisher'].value;
    this.book.price=this.bookForm.controls['price'].value;
    this.book.content=this.bookForm.controls['content'].value;
    this.book.active=this.bookForm.controls['active'].value;
    this.book.status=this.bookForm.controls['status'].value;
    let user_email=sessionStorage.getItem('user_email');
    this.book.authorEmail=`${user_email}`;
    let token=sessionStorage.getItem(`${user_email}`);
    console.log(token)
    this._service.editBookToRemote(this.book,token).subscribe(
    data=>{console.log(data);
    alert("Book is successfully edited !!");
    this._service.viewAddedBooks(user_email,token).subscribe(data=>{
      console.log(typeof data,data);
      this.bookArray=data;
     console.log(this.bookArray);
    })}
    )
  }
}
