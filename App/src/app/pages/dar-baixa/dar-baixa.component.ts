import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  PageTitle,
  TipoDeReagente,
  UnDeMedida,
  darBaixaRequest,
} from 'src/app/interfaces';
import {
  DarBaixaService,
  TiposDeReagenteService,
  UnsDeMedidaService,
  UserService,
} from 'src/app/services';
import {
  ConfirmSaveComponent,
  PageComponent,
  SnackbarComponent,
} from 'src/app/shared';

@Component({
  selector: 'app-dar-baixa',
  templateUrl: './dar-baixa.component.html',
  styleUrls: ['./dar-baixa.component.scss'],
})
export class DarBaixaComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    private tiposDeReagenteService: TiposDeReagenteService,
    private unsDeMedidaService: UnsDeMedidaService,
    private darBaixaService: DarBaixaService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'file_upload',
    title: 'Cadastrar Baixa de Reagentes e Materiais',
  };

  public unsSelectData: UnDeMedida[] = [];
  public tiposSelectData: TipoDeReagente[] = [];

  protected formsArray: FormGroup[] = [];

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
    message = 'Os itens serão baixados do estoque!'
  ): void {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: message,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const id_usuario = this.userService.getUserId();

        const requestArray: darBaixaRequest[] = [];

        this.formsArray.forEach((data) => {
          requestArray.push(data.value as darBaixaRequest);
        });

        if (id_usuario !== null) {
          requestArray.forEach((request) => {
            request.id_usuario = id_usuario;
          });
        } else {
          console.error('ID do usuário é nulo.');
          return;
        }

        // TODO validar quantidade em estoque antes de enviar as requests
        requestArray.forEach((request) => {
          console.log(request);
          this.darBaixaService.addNew(request.id, request).subscribe({
            error: (e) => {
              this.openSnackBar(true);
              console.error('Ocorreu um erro:', e);
              return;
            },
          });
        });

        requestArray.forEach((request) => {
          this.tiposDeReagenteService.updateTotals(request.id).subscribe({
            complete: () => {
              console.log('Atualizado');
              this.router.navigate(['listagem/page/1']);
              this.openSnackBar(false);
            },
            error: (e) => {
              this.openSnackBar(true);
              console.error('Ocorreu um erro:', e);
            },
          });
        });
      } else {
        this.dialog.closeAll();
      }
    });
  }

  public ngOnInit(): void {
    this.unsDeMedidaService.listAll().subscribe((responseData) => {
      this.unsSelectData = responseData;
    });

    this.tiposDeReagenteService.listAll().subscribe((responseData) => {
      this.tiposSelectData = responseData;
    });

    this.addNewSection();
  }
}
