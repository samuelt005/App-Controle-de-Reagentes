import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle, TipoDeReagente, UnDeMedida } from 'src/app/interfaces';
import { TiposDeReagenteService, UnsDeMedidaService } from 'src/app/services';
import { NewCommentaryComponent, PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './dar-baixa.component.html',
  styleUrls: ['./dar-baixa.component.scss'],
})
export class DarBaixaComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    public dialog: MatDialog,
    private unsDeMedidaService: UnsDeMedidaService,
    private materialTypesService: TiposDeReagenteService
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

  // Métodos
  public saveWriteOff(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    console.log(this.unsSelectData)
    console.log(this.tiposSelectData)
    this.dialog.open(NewCommentaryComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public ngOnInit(): void {
    this.unsDeMedidaService.listAll().subscribe((responseData) => {
      this.unsSelectData = responseData;
    });

    this.materialTypesService.listAll().subscribe((responseData) => {
      this.tiposSelectData = responseData;
    });
  }
}
