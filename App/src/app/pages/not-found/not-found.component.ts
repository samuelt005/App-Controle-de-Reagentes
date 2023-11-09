import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent extends PageComponent {
  constructor(private router: Router) {
    super();
  }

  returnPage() {
    setTimeout(() => {
      this.router.navigate(['/listing/page/1']);
    }, 500);
  }
}
