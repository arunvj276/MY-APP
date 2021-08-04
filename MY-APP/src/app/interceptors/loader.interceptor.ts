import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "../service/loader.service";
import { AuthService } from "../service/auth.service";



@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(public loaderService: LoaderService,private authService:AuthService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authService.getJwtToken())
        req=this.addToken(req,this.authService.getJwtToken()||'{}');
        this.loaderService.show();
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );
    }


    private addToken(request:HttpRequest<any>,token:string){

        return request.clone({
            setHeaders:{
                "Authorization": `Bearer ${token}`
            }
        });
    }

}