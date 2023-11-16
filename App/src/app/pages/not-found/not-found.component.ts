import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent extends PageComponent {
  // Construtor
  constructor(private router: Router) {
    super();
  }

  // Métodos
  public returnPage() {
    setTimeout(() => {
      this.router.navigate(['/listagem/page/1']);
    }, 500);
  }
}
