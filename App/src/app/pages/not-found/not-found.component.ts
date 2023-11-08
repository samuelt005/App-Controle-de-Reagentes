import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  returnPage() {
    setTimeout(() => {
      this.router.navigate(['/listing/page/1']);
    }, 500);
  }
}
