import { UserService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './confirmar-email.component.html',
  styleUrls: ['./confirmar-email.component.scss'],
})
export class ConfirmarEmailComponent implements OnInit {
  // Construtor
  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Atributos
  private confirmationId = '';
  public confirmationText = '';
  public isLoading = true;

  // Métodos
  public goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.confirmationId = params['id'];
    });

    setTimeout(() => {
      this.UserService.confirmEmail(this.confirmationId).subscribe({
        next: () => {
          this.isLoading = false;
          this.confirmationText = 'E-mail confirmado com sucesso!';
        },
        error: (e) => {
          if (e.status === 400) {
            this.isLoading = false;
            this.confirmationText = 'Este e-mail já está confirmado!';
          } else if (e.status === 404) {
            this.isLoading = false;
            this.confirmationText =
              'Erro desconhecido ao confirmar o e-mail.';
          } else {
            this.isLoading = false;
            this.confirmationText =
              'Erro desconhecido ao confirmar o e-mail. Tente novamente mais tarde.';
          }
        },
      });
    }, 1000);
  }
}
