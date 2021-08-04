import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/model/Role';
import { NotificationService } from 'src/app/service/notification.service';
import { RoleService } from 'src/app/service/role.service';
import { RoleComponent } from '../role/role.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  displayedColumns: string[] = ['id','roleName','actions'];
  dataSource:any;
  viewadd:boolean=false;
  role:Role={}
  
 
  constructor(private roleService:RoleService,public dialog: MatDialog,public notificationService:NotificationService) { 
      console.log("role core called");    
  }

  ngOnInit(): void {
    this.viewUser();
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator=undefined;
  @ViewChild(MatSort)sort?: MatSort;
  searchKey?: string;

  
  
  viewUser(){
    this.roleService.getProduct().subscribe(data=>{
      this.dataSource=new MatTableDataSource<any>(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.dataSource.sort = this.sort;
    });
    console.log("displayed columns - ",this.displayedColumns);
    console.log("Role array values - ",this.dataSource);
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
    this.roleService.setRolePopulate(this.role);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "60%";
    const dialogRef=this.dialog.open(RoleComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }

  onEdit(row:Role){
    console.log("on edit data - ",row);
    this.roleService.setRolePopulate(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height="60%";
    const dialogRef=this.dialog.open(RoleComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }

  onDelete(row:Role){
    if(confirm('Are you sure want to delete this record ?')){
      this.roleService.deleteProduct(row).subscribe((data:any)=>{
        console.log("deleted data - "+data);
        this.ngOnInit();
        this.notificationService.warn('! Deleted successfully');
      });
      
      
    }
  }
}
