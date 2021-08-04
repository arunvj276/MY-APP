import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productArr: any=[];
  productPopulate: Product={};
  apiurl="http://localhost:3000/product";
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


  getProduct() :Observable<Product[]> {
    return this.httpService.get<Product[]>(this.apiurl).
      pipe(catchError(this.handleError)
    );
  }


  addProduct(product: Product) {
    console.log("Add product called");
    return this.httpService.post<Product[]>(this.apiurl,product,
      this.httpOptions).pipe(tap(data=>console.log("post object - ",data)),
      catchError(this.handleError));

  }

  updateProduct(product: Product) {
    console.log("update product called");
    let endPoint=`${this.apiurl}/${product.id}`;
    return this.httpService.put<Product>(endPoint,product,
      this.httpOptions).pipe(tap(data=>console.log("put object - ",data)),
      catchError(this.handleError));


  }

  deleteProduct(product: Product) {
    
    let endpoint="/"+product.id;
    return this.httpService.delete<Product>(this.apiurl+endpoint);
  }


  //getter and setter for populate product details
  setProductPopulate(product: Product) {
    this.productPopulate.productName=product.productName;
    this.productPopulate.price=product.price;
    this.productPopulate.id=product.id;
  }
  getProductPopulate() {
    return this.productPopulate;
  }



}
