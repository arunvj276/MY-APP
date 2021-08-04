import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 
  roleArr: any=[];
  rolePopulate: Role={};
  apiurl="http://localhost:3000/role";
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


  getProduct() :Observable<Role[]> {
    return this.httpService.get<Role[]>(this.apiurl).
      pipe(catchError(this.handleError)
    );
  }


  addProduct(product: Role) {
    console.log("Add role called");
    return this.httpService.post<Role[]>(this.apiurl,product,
      this.httpOptions).pipe(tap(data=>console.log("post object - ",data)),
      catchError(this.handleError));

  }

  updateProduct(role: Role) {
    console.log("update role called");
    let endPoint=`${this.apiurl}/${role.id}`;
    return this.httpService.put<Role>(endPoint,role,
      this.httpOptions).pipe(tap(data=>console.log("put object - ",data)),
      catchError(this.handleError));


  }

  deleteProduct(role: Role) {
    
    let endpoint="/"+role.id;
    return this.httpService.delete<Role>(this.apiurl+endpoint);
  }


  //getter and setter for populate product details
  setRolePopulate(role: Role) {
    this.rolePopulate.roleName=role.roleName;
    this.rolePopulate.id=role.id;
  }
  getRolePopulate() {
    return this.rolePopulate;
  }



}

