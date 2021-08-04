import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/service/auth.service';
import { CoreService } from 'src/app/service/customer.service';
import { NotificationService } from 'src/app/service/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private coreService: CoreService,
    private authService: AuthService, private notificationService: NotificationService) {
  }
  login_failure: boolean = false;


  onSubmit(form: NgForm) {
    let loginFlag = false;
    this.authService.login(form).subscribe((data: any) => {
      console.log("data->", data);
      this.addToken(data);
      if (!this.login_failure) {
        if ((form.controls['loginUsername'].value == 'admin' || form.controls['loginUsername'].value == 'user') && form.controls['loginPassword'].value == 'password') {
          console.log("login successfull");
          this.router.navigate(['/home']);
          this.notificationService.success(':: Logged in successfully');
        }
        else {
          this.login_failure = true;
          this.notificationService.warn(':: Login failure');
        }
      }
    });

  }

  addToken(data: any) {
    if (data && data.token) {
      localStorage.setItem("token", data.token);
    }
    else {
      this.login_failure = true;
    }
  }

}

