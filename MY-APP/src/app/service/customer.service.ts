import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Customer } from '../model/Customer';
import * as mockJson from '../../assets/mock.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { any } from 'underscore';




@Injectable({
  providedIn: 'root'
})
export class CoreService {


  customerArr: any[]=[];
  customerPopulate: Customer={};
  apiurl="http://localhost:3000/customer";
  headers = new HttpHeaders().
            set('Content-Type','application/json').set('Accept','application/json');
  httpOptions={
        headers:this.headers
  }



  constructor(public httpService:HttpClient) {
      // this.customerArr=(mockJson as any).default;
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }


  getCustomer() :Observable<Customer[]> {
    return this.httpService.get<Customer[]>(this.apiurl).
      pipe(catchError(this.handleError)
    );
  }


  addCustomer(customer: Customer) {
    console.log("Add customer called");
    const maxId=this.getCustomerList().reduce((prev, current) => (prev.id > current.id) ? prev : current);
    console.log("max id - ",maxId.id=maxId.id+1);
    
    customer.id=maxId.id;
    return this.httpService.post<Customer[]>(this.apiurl,customer,
      this.httpOptions).pipe(tap(data=>console.log("post object - ",data)),
      catchError(this.handleError));

  }

  updateCustomer(customer: Customer) {
    console.log("update customer called");
    let endPoint=`${this.apiurl}/${customer.id}`;
    return this.httpService.put<Customer>(endPoint,customer,
      this.httpOptions).pipe(tap(data=>console.log("put object - ",data)),
      catchError(this.handleError));


  }

  deleteCustomer(customer: Customer) {
    
    let endpoint="/"+customer.id;
    return this.httpService.delete<Customer>(this.apiurl+endpoint);
  }


  //getter and setter for populate customer details
  setCustomerPopulate(customer: Customer) {
    this.customerPopulate.mobileNumber=customer.mobileNumber;
    this.customerPopulate.name=customer.name;
    this.customerPopulate.product=customer.product;
    this.customerPopulate.price=customer.price;
    this.customerPopulate.id=customer.id;
  }
  getCustomerPopulate() {
    return this.customerPopulate;
  }

  setCustomerList(customerArr:any[]){
    this.customerArr=customerArr;
  }

  getCustomerList(){

    return this.customerArr;
  }




}
