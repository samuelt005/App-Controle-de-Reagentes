import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditNfe } from 'src/app/interfaces/dialogs/edit-type/edit-nfe';
import { fornecedoresRow } from 'src/app/interfaces/tables/fornecedores-row';
import { FornecedoresService } from 'src/app/services/fornecedores/fornecedores.service';

@Component({
  selector: 'app-edit-nfe',
  templateUrl: './edit-nfe.component.html',
  styleUrls: ['./edit-nfe.component.scss'],
})
export class EditNfeComponent implements OnInit {
  selectData: fornecedoresRow[] = [];
  nfeData: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: EditNfe,
    private formBuilder: FormBuilder,
    private fornecedoresService: FornecedoresService
  ) {
    console.log(injectedData);
    this.nfeData = this.formBuilder.group({
      numero: injectedData.rowData.numero,
      data: injectedData.rowData.data_emissao,
      fornecedor: 'teste',
    });
  }

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
