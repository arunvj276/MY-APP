import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  color = 'primary';
  //mode = 'indeterminate';
  value = 50;
  
  isLoading: BehaviorSubject<boolean> = this.loaderService.isLoading;
  
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
