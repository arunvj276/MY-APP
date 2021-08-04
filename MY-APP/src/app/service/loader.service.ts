import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
    isLoading = new BehaviorSubject<boolean>(false);
    
    show() {
        this.isLoading.next(true);
    }

    hide() {
        this.isLoading.next(false);
    }
}