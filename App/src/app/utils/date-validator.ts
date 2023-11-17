import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputValue = control.value;

    if (!inputValue) {
      return null;
    }

    const isValidDate = moment(inputValue, 'YYYY-MM-DD', true).isValid();

    if (!isValidDate) {
      return { invalidDate: true };
    }

    return null;
  };
}
