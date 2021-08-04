import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/User';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  displayedColumns: string[] = ['id','userName','role','actions'];
  dataSource:any;
  viewadd:boolean=false;
  user:User={}
  
 
  constructor(private productService:UserService,public dialog: MatDialog,public notificationService:NotificationService) { 
      console.log("user core called");    
  }

  ngOnInit(): void {
    this.viewUser();
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator=undefined;
  @ViewChild(MatSort)sort?: MatSort;
  searchKey?: string;

  
  
  viewUser(){
    this.productService.getProduct().subscribe(data=>{
      this.dataSource=new MatTableDataSource<any>(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.dataSource.sort = this.sort;
    });
    console.log("displayed columns - ",this.displayedColumns);
    console.log("User array values - ",this.dataSource);
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

  addUserDialogueOpen() {
    this.productService.setUserPopulate(this.user);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "60%";
    const dialogRef=this.dialog.open(UserComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }

  onEdit(row:User){
    console.log("on edit data - ",row);
    this.productService.setUserPopulate(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height="60%";
    const dialogRef=this.dialog.open(UserComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }

  onDelete(row:User){
    if(confirm('Are you sure want to delete this record ?')){
      this.productService.deleteProduct(row).subscribe((data:any)=>{
        console.log("deleted data - "+data);
        this.ngOnInit();
        this.notificationService.warn('! Deleted successfully');
      });
      
      
    }
  }
  
  

}
