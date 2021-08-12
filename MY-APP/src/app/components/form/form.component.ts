import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input()
  requiredFileType: string | undefined;

  fileName = '';

  gender:string='';

  role = new FormControl();
  roleList: string[] = ['User', 'Member', 'Admin'];


  constructor() { }

  ngOnInit() {
   
  }
  
 
  onSubmit(form: NgForm) {

  }

  resetForm(){

    this.fileName="";
    this.roleList=[];
    this.gender='';
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      console.log("Form value->", formData);
      
    }
  }
}
