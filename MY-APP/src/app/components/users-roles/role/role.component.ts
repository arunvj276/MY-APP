import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { NotificationService } from 'src/app/service/notification.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  headerProduct: string="Add Role";
  role: Role={};
  updateFlag?: boolean;

  constructor(private roleService:RoleService,public dialogRef: MatDialogRef<RoleComponent>, public notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {

    if (this.roleService.getRolePopulate().id != null) {
      this.headerProduct = "Update Role";
      this.role = this.roleService.getRolePopulate();
      this.updateFlag = true;
    }
  }


  onSubmit(form: NgForm): void {
    console.log("form object - ", form.value);
    if (!this.updateFlag) {
      this.roleService.addProduct(form.value).subscribe((data: any) => {
        console.log("Add object --> ", data);
        this.onClose();
      });
    } else {
      this.roleService.updateProduct(form.value).subscribe((data: any) => {
        console.log("Update object --> ", data);
        this.onClose();
      });

    }
  }


  onClose() {
    this.dialogRef.close();
    this.notificationService.success(':: Submitted successfully');
  }


}