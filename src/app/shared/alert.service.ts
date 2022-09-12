import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertMessage = new Subject<any>();

  constructor() { }

  getAlert() {
    return this.alertMessage.asObservable();
  }

  success(message: string) {
    this.alertMessage.next({ type: 'success', text: message });
  }

  error(message: string) {
    this.alertMessage.next({ type: 'error', text: message });
  }

}
