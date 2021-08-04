import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  headerProduct: string="Add Product";
  product: Product={};
  updateFlag?: boolean;
  backNavigation:boolean=false;

  constructor(private productService:ProductService, public notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {

    if (this.productService.getProductPopulate().id != null) {
      this.headerProduct = "Update Product";
      this.backNavigation=true;
      this.product = this.productService.getProductPopulate();
      this.updateFlag = true;
    }
  }


  onSubmit(form: NgForm): void {
    console.log("form object - ", form.value);
    if (!this.updateFlag) {
      this.productService.addProduct(form.value).subscribe((data: any) => {
        console.log("Add object --> ", data);
      });
    } else {
      this.productService.updateProduct(form.value).subscribe((data: any) => {
        console.log("Update object --> ", data);
       
      });

    }
  }


  


}
