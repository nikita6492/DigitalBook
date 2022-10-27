import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http' 
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class DigitalBooksService {

  public url: string = "";
  constructor(private _http:HttpClient) { }

  public signInUserFromRemote(user:User){
    let resp = this._http.post("http://localhost:9091/api/v1/digitalbooks/sign-in",user,{responseType: 'text' as 'json'});
    console.log(resp);
    return resp;
  }

  public signUpUserFromRemote(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:9091/api/v1/digitalbooks/sign-up",user)
  }

  public searchBookFromRemote(book:Book):Observable<any>{
    if(book.category!=null && book.title==null && book.author==null) {
			this.url=`http://localhost:9092/api/v1/digitalbooks/search?category=${book.category}`;
		}else if(book.category==null && book.title!=null && book.author==null) {
			this.url=`http://localhost:9092/api/v1/digitalbooks/search?&title=${book.title}`;
		}else if(book.category==null && book.title==null && book.author!=null) {
			this.url=`http://localhost:9092/api/v1/digitalbooks/search?author=${book.author}`;
		}else if(book.category!=null && book.title!=null && book.author==null) {
			this.url=`http://localhost:9092/api/v1/digitalbooks/search?category=${book.category}&title=${book.title}`;
		}else if(book.category!=null && book.title==null && book.author!=null) {
			this.url=`http://localhost:9092/api/v1/digitalbooks/search?category=${book.category}&author=${book.author}`;
		}else if(book.category==null && book.title!=null && book.author!=null) {
			this.url=`http://localhost:9092/api/v1/digitalbooks/search?title=${book.title}&author=${book.author}`;
		}else if(book.category!=null && book.title!=null && book.author!=null) {
			this.url=`http://localhost:9092/api/v1/digitalbooks/search?category=${book.category}&title=${book.title}&author=${book.author}`;
		}
    return this._http.get<any>(this.url);
  }

  public viewAddedBooks(email:any,token:any):Observable<any>{
    let tokenStr=`Bearer ${token}`;
   const headers:HttpHeaders = new HttpHeaders().set('Authorization',tokenStr).set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token')
   .set('Access-Control-Allow-Origin','*').set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

console.log(headers);

    return this._http.get<any>(`http://localhost:9092/api/v1/digitalbooks/viewAddedBooks/${email}`,{headers:headers});
  }

  public addBookToRemote(book:Book,token:any){
    let user_email=sessionStorage.getItem("user_email");
    let tokenStr=`Bearer ${token}`;
   const headers:HttpHeaders = new HttpHeaders().set('Authorization',tokenStr).set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token')
   .set('Access-Control-Allow-Origin','*').set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    return this._http.post<any>(`http://localhost:9092/api/v1/digitalbooks/author/${user_email}/books`,book,{headers:headers});
  }

  public editBookToRemote(book:Book,token:any){
    let user_email=sessionStorage.getItem("user_email");
    let tokenStr=`Bearer ${token}`;
   const headers:HttpHeaders = new HttpHeaders().set('Authorization',tokenStr).set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token')
   .set('Access-Control-Allow-Origin','*').set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
   return this._http.put<any>(`http://localhost:9092/api/v1/digitalbooks/author/${user_email}/books/${book.id}`,book,{headers:headers});
  }

  public deleteBookFromRemote(id:number,token:any){
    let user_email=sessionStorage.getItem("user_email");
    let tokenStr=`Bearer ${token}`;
   const headers:HttpHeaders = new HttpHeaders().set('Authorization',tokenStr).set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token')
   .set('Access-Control-Allow-Origin','*').set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
   return this._http.delete<any>(`http://localhost:9092/api/v1/digitalbooks/deleteBook/${id}`,{headers:headers});
  }

  public blockBookFromRemote(id:number,token:any){
    let user_email=sessionStorage.getItem("user_email");
    let tokenStr=`Bearer ${token}`;
   const headers:HttpHeaders = new HttpHeaders().set('Authorization',tokenStr).set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token')
   .set('Access-Control-Allow-Origin','*').set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
   return this._http.post<any>(`http://localhost:9092/api/v1/digitalbooks/author/${user_email}/books/${id}?block=yes`,{headers:headers});
  }

  public unblockBookFromRemote(id:number,token:any){
    let user_email=sessionStorage.getItem("user_email");
    let tokenStr=`Bearer ${token}`;
   const headers:HttpHeaders = new HttpHeaders().set('Authorization',tokenStr).set('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token')
   .set('Access-Control-Allow-Origin','*').set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
   return this._http.post<any>(`http://localhost:9092/api/v1/digitalbooks/author/${user_email}/books/${id}?block=no`,{headers:headers});
  }
}
