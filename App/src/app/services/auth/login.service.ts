import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSuccessSubject = new Subject<void>();

  triggerLoginSuccessEvent() {
    this.loginSuccessSubject.next();
  }
  
  public getLoginSuccessObservable(): Observable<void> {
    return this.loginSuccessSubject.asObservable();
  }
}
