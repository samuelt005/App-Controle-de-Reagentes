import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  PageTitle,
  TipoDeReagente,
  UnDeMedida,
  solicitacaoRequest,
} from 'src/app/interfaces';
import {
  UnsDeMedidaService,
  TiposDeReagenteService,
  UserService,
  SolicitarService,
} from 'src/app/services';
import {
  ConfirmSaveComponent,
  PageComponent,
  SnackbarComponent,
} from 'src/app/shared';

@Component({
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.scss'],
})
export class SolicitarComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    public dialog: MatDialog,
    private unsDeMedidaService: UnsDeMedidaService,
    private materialTypesService: TiposDeReagenteService,
    private solicitarService: SolicitarService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--sucesso-2)',
    icon: 'file_download',
    title: 'Cadastrar Solicitação de Compra',
  };

  public unsSelectData: UnDeMedida[] = [];
  public tiposSelectData: TipoDeReagente[] = [];

  protected formsArray: FormGroup[] = [];

  public comentario = 'Teste';

  // Métodos
  public isFormsArrayValid(): boolean {
    return this.formsArray.every((dataInputForm) => dataInputForm.valid);
  }

  public addNewSection() {
    const newSection = this.formBuilder.group({
      id: ['', Validators.required],
      qtd_mov: ['', Validators.required],
      peso_un: ['', Validators.required],
      comentario: ['', Validators.required],
    });

    this.formsArray.push(newSection);
  }

  public deleteSection(index: number) {
    this.formsArray.splice(index, 1);
  }

  private openSnackBar(error: boolean, message?: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2000,
      data: { error, message },
    });
  }

  public saveData(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms',
    message = 'A solicitação será enviada para análise!'
  ): void {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: message,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const id_usuario = this.userService.getUserId();

        if (id_usuario !== null) {
          this.solicitarService
            .addNewSolicitacao(this.comentario, id_usuario)
            .subscribe(
              (id_solicitacao) => {
                const requestArray: solicitacaoRequest[] = [];

                this.formsArray.forEach((data) => {
                  const request = data.value as solicitacaoRequest;
                  request.id_solicitacao = id_solicitacao;
                  request.id_usuario = id_usuario;
                  requestArray.push(request);
                });

                let requestsCompleted = 0;

                requestArray.forEach((request) => {
                  this.solicitarService
                    .addNewItem(request.id, request)
                    .subscribe({
                      complete: () => {
                        requestsCompleted++;

                        if (requestsCompleted === requestArray.length) {
                          this.router.navigate(['listagem/page/1']);
                          this.openSnackBar(false);
                        }
                      },
                      error: (e) => {
                        this.openSnackBar(true);
                        console.error('Ocorreu um erro:', e);
                        return;
                      },
                    });
                });
              },
              (error) => {
                console.error('Erro ao adicionar nova solicitação:', error);
              }
            );
        } else {
          console.error('ID do usuário é nulo.');
          return;
        }
      } else {
        this.dialog.closeAll();
      }
    });
  }

  public ngOnInit(): void {
    this.unsDeMedidaService.listAll().subscribe((responseData) => {
      this.unsSelectData = responseData;
    });

    this.materialTypesService.listAll().subscribe((responseData) => {
      this.tiposSelectData = responseData;
    });

    this.addNewSection();
  }
}
