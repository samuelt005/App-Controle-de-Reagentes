import { Tags } from './../../interfaces/tables/tags';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle } from 'src/app/interfaces/page-title';
import { TypesRow } from 'src/app/interfaces/tables/types-row';
import { EditTagsComponent } from './dialogs/edit-tags/edit-tags.component';
import { NewTypeComponent } from './dialogs/new-type/new-type.component';
import { EditTypeComponent } from './dialogs/edit-type/edit-type.component';
import { ConfirmInactivationComponent } from './dialogs/confirm-inactivation/confirm-inactivation.component';

@Component({
  templateUrl: './material-types.component.html',
  styleUrls: ['./material-types.component.scss'],
})
export class MaterialTypesComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'assignment',
    title: 'Manter Reagentes e Materiais',
    searchBox: true,
    adjustButton: false,
  };

  tableRow: TypesRow[] = [
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: false, pf: false, pc: true, eb: true },
      localizacao: '2345A',
      un: 'lt',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 0,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 0,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '123',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
    {
      cod: '12312414',
      desc: 'lorem ipsum',
      tags: { em: true, pf: true, pc: true, eb: true },
      localizacao: '2345A',
      un: 'kg',
      valor_estoque: 12,
      prod_id: 1,
    },
  ];

  constructor(public dialog: MatDialog) {}

  openTags(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    tags: Tags,
  ): void {
    this.dialog.open(EditTagsComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { tags },
    });
  }

  openEditItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    rowData: TypesRow,
  ): void {
    this.dialog.open(EditTypeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { rowData },
    });
  }

  confirmInactivation(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    valor_estoque: number,
  ): void {
    if (valor_estoque === 0) {
      this.dialog.open(ConfirmInactivationComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }

  openNewItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(NewTypeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
