import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import jwt_decode from 'jwt-decode';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtObj:any={};
  apiurl = "http://localhost:3000/user";
  headers = new HttpHeaders().
    set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  }



  constructor(private httpService: HttpClient) {

  }


  login(credentials: any) {
    if (credentials.value.loginUsername == "admin") {
      credentials.id = 4000;
    } else {
      credentials.id = 4001;
    }
    return this.httpService.get<any[]>(this.apiurl+"/"+credentials.id).pipe(tap((res: any) => this.setSession));
  }
  

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }


  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration_at");
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration || '{}');
    return moment(expiresAt);
  }


  getJwtToken(){
    return localStorage.getItem("token")? localStorage.getItem("token"):'{}';
  }

  hasAdmin():boolean{

    this.jwtObj = jwt_decode(localStorage.getItem("token")|| '{}'); 
    if(this.jwtObj.admin){
      
      return true;
    }
    
      return false;
    
  }

  getUserName(){

    this.hasAdmin();
    return this.jwtObj.name;

  }


}
