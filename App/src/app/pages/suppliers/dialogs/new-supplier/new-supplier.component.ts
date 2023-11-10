import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuppliersService } from 'src/app/services';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss'],
})
export class NewSupplierComponent {
  SupplierData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private suppliersService: SuppliersService
  ) {
    this.SupplierData = this.formBuilder.group({
      cnpj: '',
      razao_social: '',
    });
  }

  saveData() {
    this.suppliersService.addNew(this.SupplierData.value).subscribe((data) => {
      console.log(data);
      // this.refreshPeople();
    });
  }
}
