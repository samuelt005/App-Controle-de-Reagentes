import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialTypesUpdaterService {
  private updateSubject = new Subject<void>();

  updateTable() {
    this.updateSubject.next();
  }

  getUpdateObservable() {
    return this.updateSubject.asObservable();
  }
}
