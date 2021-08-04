import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  headerProduct: string="Add User";
  user: User={};
  updateFlag?: boolean;

  constructor(private userService:UserService,public dialogRef: MatDialogRef<UserComponent>, public notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {

    if (this.userService.getUserPopulate().id != null) {
      this.headerProduct = "Update User";
      this.user = this.userService.getUserPopulate();
      this.updateFlag = true;
    }
  }


  onSubmit(form: NgForm): void {
    console.log("form object - ", form.value);
    if (!this.updateFlag) {
      this.userService.addProduct(form.value).subscribe((data: any) => {
        console.log("Add object --> ", data);
        this.onClose();
        this.notificationService.success(':: Submitted successfully');
      });
      
    } else {
      this.userService.updateProduct(form.value).subscribe((data: any) => {
        console.log("Update object --> ", data);
        this.onClose();
        this.notificationService.success(':: Submitted successfully');
      });

    
    }
  }


  onClose() {
    this.dialogRef.close();
   
  }

}
