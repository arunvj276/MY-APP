import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CoreService } from 'src/app/service/customer.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  headerViews: any = true;
  hasAdmin:boolean=false;
  isExpanded:any;
  user:any;
  header="Customer Service";

  constructor( private coreService: CoreService,private authService:AuthService, private router: Router, private notificationService: NotificationService) { 

    this.user=this.authService.getUserName();
  }

  ngOnInit(): void {
    if(this.authService.hasAdmin()){
      this.hasAdmin=true; 
          
    }    
    console.log("hasAdmin - ",this.hasAdmin);

    this.router.navigate(['/home/core']);
  }
  

  logout() {

    if (confirm("Are you sure want to log out?")) {
      this.authService.logOut();
      this.router.navigate(["/login"]);
      this.notificationService.success(':: Logged out successfully');
      
    }
  }

 





}
