import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuppliersRow, EditNfe } from 'src/app/interfaces';
import { SuppliersService } from 'src/app/services';
import { DialogComponent } from 'src/app/shared';

@Component({
  selector: 'app-edit-nfe',
  templateUrl: './edit-nfe.component.html',
  styleUrls: ['./edit-nfe.component.scss'],
})
export class EditNfeComponent extends DialogComponent implements OnInit {
  selectData: SuppliersRow[] = [];
  nfeData: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: EditNfe,
    private formBuilder: FormBuilder,
    private fornecedoresService: SuppliersService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
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
      this.selectData = responseData.data;
    });
  }
}
