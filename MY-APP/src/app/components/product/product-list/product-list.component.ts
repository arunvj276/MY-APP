import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  displayedColumns: string[] = ['id','productName','price','actions'];
  dataSource:any;
  viewadd:boolean=false;
  product:Product={}
  hasAdmin:boolean=false;
 
  constructor(private productService:ProductService,public dialog: MatDialog,
    public notificationService:NotificationService,private router:Router,private authService:AuthService) { 
      console.log("product core called");
      
  }

  ngOnInit(): void {
    if(this.authService.hasAdmin()){
      this.hasAdmin=true;     
    }    
    console.log("hasAdmin - ",this.hasAdmin);
    this.viewCustomer();

  }

  @ViewChild(MatPaginator) paginator?: MatPaginator=undefined;
  @ViewChild(MatSort)sort?: MatSort;
  searchKey?: string;

  
  
  viewCustomer(){
    this.productService.getProduct().subscribe(data=>{
      this.dataSource=new MatTableDataSource<any>(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.dataSource.sort = this.sort;
    });
    console.log("displayed columns - ",this.displayedColumns);
    console.log("customer array values - ",this.dataSource);
    this.dataSource = new MatTableDataSource<any>(this.dataSource);
    console.log("matTable source - ",this.dataSource);
    this.viewadd=false;  
  }

  onSearchClear() {
   
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter=this.searchKey?.trim().toLowerCase();
    console.log("filter data - ",this.dataSource);
  }

  addProductDialogueOpen() {
    this.productService.setProductPopulate(this.product);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "60%";
    const dialogRef=this.dialog.open(ProductComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }

  onEdit(row:Product){
    console.log("on edit data - ",row);
    this.productService.setProductPopulate(row);
    this.router.navigate(['/home/product']);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "50%";
    // dialogConfig.height="60%";
    // const dialogRef=this.dialog.open(ProductComponent,dialogConfig);
    // dialogRef.afterClosed().subscribe(()=>{
    //   this.ngOnInit();
    // });


  }

  onDelete(row:Product){
    if(confirm('Are you sure want to delete this record ?')){
      this.productService.deleteProduct(row).subscribe((data:any)=>{
        console.log("deleted data - "+data);
        this.ngOnInit();
        this.notificationService.warn('! Deleted successfully');
      });
      
      
    }
  }
  
  

}


