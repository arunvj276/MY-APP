import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userArr: any=[];
  userPopulate: User={};
  apiurl="http://localhost:3000/user";
  headers = new HttpHeaders().
            set('Content-Type','application/json').set('Accept','application/json');
  httpOptions={
        headers:this.headers
  }



  constructor(public httpService:HttpClient) {
      // this.productArr=(mockJson as any).default;
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }


  getProduct() :Observable<User[]> {
    return this.httpService.get<User[]>(this.apiurl).
      pipe(catchError(this.handleError)
    );
  }


  addProduct(product: User) {
    console.log("Add user called");
    return this.httpService.post<User[]>(this.apiurl,product,
      this.httpOptions).pipe(tap(data=>console.log("post object - ",data)),
      catchError(this.handleError));

  }

  updateProduct(user: User) {
    console.log("update user called");
    let endPoint=`${this.apiurl}/${user.id}`;
    return this.httpService.put<User>(endPoint,user,
      this.httpOptions).pipe(tap(data=>console.log("put object - ",data)),
      catchError(this.handleError));


  }

  deleteProduct(user: User) {
    
    let endpoint="/"+user.id;
    return this.httpService.delete<User>(this.apiurl+endpoint);
  }


  //getter and setter for populate product details
  setUserPopulate(user: User) {
    this.userPopulate.userName=user.userName;
    this.userPopulate.role=user.role;
    this.userPopulate.id=user.id;
  }
  getUserPopulate() {
    return this.userPopulate;
  }



}
