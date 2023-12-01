import { Component } from '@angular/core';
import { SnackbarComponent } from '../..';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnDeMedida } from 'src/app/interfaces';

@Component({
  template: '',
})
export abstract class DialogComponent {
  // Construtor
  constructor(public snackBar: MatSnackBar) {}

  // Atributos
  public unsSelectData: UnDeMedida[] = [
    {
      id: 1,
      sigla: 'ml',
      nome: 'Mililitros',
      peso: 1,
    },
    {
      id: 2,
      sigla: 'lt',
      nome: 'Litros',
      peso: 1000,
    },
    {
      id: 3,
      sigla: 'mg',
      nome: 'Miligramas',
      peso: 0.001,
    },
    {
      id: 4,
      sigla: 'gr',
      nome: 'Gramas',
      peso: 1,
    },
    {
      id: 5,
      sigla: 'kg',
      nome: 'Kilogramas',
      peso: 1000,
    },
  ];

  // Métodos
  protected getFormattedCnpj(cnpj: string): string {
    if (cnpj.length == 14) {
      const formattedCnpj = cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
      return formattedCnpj;
    } else {
      return 'CNPJ inválido';
    }
  }

  protected openSnackBar(error: boolean, message?: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2000,
      data: { error, message },
    });
  }
}
