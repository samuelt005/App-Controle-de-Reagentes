import { Component } from '@angular/core';
import { PaginatorData } from 'src/app/interfaces';

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

  protected dataInputs: object[] = [];

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

  protected addNewSection() {
    this.dataInputs.push({});
  }

  protected deleteSection(index: number) {
    this.dataInputs.splice(index, 1);
  }
}
