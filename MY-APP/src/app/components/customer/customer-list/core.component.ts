import { Component, ViewChild,AfterViewInit, Inject, OnInit } from '@angular/core';
import { CoreService } from '../../../service/customer.service';
import {Customer} from '../../../model/Customer';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';
import { NotificationService } from 'src/app/service/notification.service';
import { Product } from 'src/app/model/Product';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  displayedColumns: string[] = ['id','mobileNumber', 'name', 'product', 'price','actions'];
  dataSource:any;
  viewadd:boolean=false;
  customer:Customer={}
  hasAdmin:boolean=false;
 
  
 
  constructor(private coreService:CoreService,private router:Router,private authService:AuthService,public dialog: MatDialog,public notificationService:NotificationService) { 
      console.log("core called");
      
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

  
  
  
  viewCustomer():void{
    this.coreService.getCustomer().subscribe(data=>{
      this.coreService.setCustomerList(data);
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

  addCustomerDialogueOpen() {
    this.coreService.setCustomerPopulate(this.customer);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef=this.dialog.open(CustomerComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }

  onEdit(row:Customer){
    console.log("on edit data - ",row);
    this.coreService.setCustomerPopulate(row);
    this.router.navigate(['/home/customer']);
  }

  onDelete(row:Customer){
    if(confirm('Are you sure want to delete this record ?')){
      this.coreService.deleteCustomer(row).subscribe((data:any)=>{
        console.log("deleted data - "+data);
        this.ngOnInit();
        this.notificationService.warn('! Deleted successfully');
      });
      
      
    }
  }
  
  

}





