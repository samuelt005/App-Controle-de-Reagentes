import { Component, OnInit } from '@angular/core';
import { fornecedoresRow } from 'src/app/interfaces/tables/fornecedores-row';
import { FornecedoresService } from 'src/app/services/fornecedores/fornecedores.service';

@Component({
  selector: 'app-new-nfe',
  templateUrl: './new-nfe.component.html',
  styleUrls: ['./new-nfe.component.scss'],
})
export class NewNfeComponent implements OnInit {
  selectData: fornecedoresRow[] = [];

  constructor(private fornecedoresService: FornecedoresService) {}

  getFormattedCnpj(cnpj: string): string {
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

  ngOnInit(): void {
    this.fornecedoresService.listAll().subscribe((responseData) => {
      this.selectData = responseData;
    });
  }
}
