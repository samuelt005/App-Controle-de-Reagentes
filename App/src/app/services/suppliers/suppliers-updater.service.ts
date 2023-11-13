import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuppliersUpdaterService {
  private updateSubject = new Subject<void>();

  updateTable() {
    this.updateSubject.next();
  }

  getUpdateObservable() {
    return this.updateSubject.asObservable();
  }
}
