import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosUpdaterService {
  private updateSubject = new Subject<void>();

  public updateTable() {
    this.updateSubject.next();
  }

  public getUpdateObservable() {
    return this.updateSubject.asObservable();
  }
}
