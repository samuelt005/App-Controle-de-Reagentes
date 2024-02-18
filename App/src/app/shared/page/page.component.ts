import { Component } from '@angular/core';
import { PaginatorData, UnDeMedida } from 'src/app/interfaces';

@Component({
  template: '',
})
export abstract class PageComponent {
  // Atributos
  protected paginatorData: PaginatorData = {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  };

  protected page = 1;
  protected loading = true;
  protected search: string | null = null;
  protected showSearchError = false;

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
  protected getFormattedDate(dateTimeStr: string): string {
    const parts = dateTimeStr.split('T')[0].split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}/${month}/${year}`;
  }

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

  protected getFormattedCpf(cpf: number): string {
    const stringCpf = new String(cpf);
    if (stringCpf.length == 11) {
      const formattedCpf = stringCpf.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
      );
      return formattedCpf;
    } else {
      return 'CPF inválido';
    }
  }
}
