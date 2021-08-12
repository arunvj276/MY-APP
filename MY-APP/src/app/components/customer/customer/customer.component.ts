import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Customer } from 'src/app/model/Customer';
import { Product } from 'src/app/model/Product';
import { CoreService } from 'src/app/service/customer.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  viewadd?: boolean;
  customer: Customer = {};
  mobileNo: boolean = false;
  headerCustomer: string = "Add Customer";
  updateFlag: boolean = false;
  products:any[]=[];
  backNavigation:boolean=false;

  constructor(
    public coreService: CoreService,private productService:ProductService, public notificationService: NotificationService, private router: Router) {
      this.getPrductDetails();

  }

  ngOnInit(): void {

    
    if (this.coreService.getCustomerPopulate().mobileNumber != null) {
      this.headerCustomer = "Update Customer";
      this.backNavigation=true;
      this.customer = this.coreService.getCustomerPopulate();
      this.updateFlag = true;
    }
    else{
      this.headerCustomer = "Add Customer";
    }
  }


  getPrductDetails(){

    this.productService.getProduct().subscribe((data:any)=>{
      console.log("product data - ",data);
      this.products.push(data);
    })

  }


  onSubmit(form: NgForm): void {
    console.log("form object - ", form.value);
    if (!this.updateFlag) {
      this.coreService.addCustomer(form.value).subscribe((data: any) => {
        console.log("Add object --> ", data);
        this.notificationService.success(":: Added Successfully");
      });
    } else {
      this.coreService.updateCustomer(form.value).subscribe((data: any) => {
        console.log("Update object --> ", data);
        this.notificationService.success(":: Updated Successfully");
        
      });

    }
    this.router.navigate(["/home/core"]);
  }


  












}
