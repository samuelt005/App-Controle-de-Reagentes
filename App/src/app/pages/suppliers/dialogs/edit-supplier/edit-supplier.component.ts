import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditSupplier } from 'src/app/interfaces';
import { SuppliersService } from 'src/app/services';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss'],
})
export class EditSupplierComponent {
  SupplierData: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: EditSupplier,
    private formBuilder: FormBuilder,
    private suppliersService: SuppliersService
  ) {
    this.SupplierData = this.formBuilder.group({
      id: injectedData.rowData.id,
      cnpj: injectedData.rowData.cnpj,
      razao_social: injectedData.rowData.razao_social,
    });
  }

  saveData() {
    console.log(this.SupplierData.value.id);
    this.suppliersService
      .edit(this.SupplierData.value, this.SupplierData.value.id)
      .subscribe((data) => {
        console.log(data);
        // this.refreshPeople();
      });
  }
}
