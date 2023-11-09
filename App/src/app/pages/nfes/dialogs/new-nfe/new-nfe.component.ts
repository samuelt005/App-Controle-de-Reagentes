import { Component, OnInit } from "@angular/core";
import { SuppliersRow } from "src/app/interfaces";
import { SuppliersService } from "src/app/services";

@Component({
  selector: 'app-new-nfe',
  templateUrl: './new-nfe.component.html',
  styleUrls: ['./new-nfe.component.scss'],
})
export class NewNfeComponent implements OnInit {
  selectData: SuppliersRow[] = [];

  constructor(private fornecedoresService: SuppliersService) {}

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
      this.selectData = responseData.data;
    });
  }
}