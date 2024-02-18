import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;
    let Soma = 0;
    let Resto;

    if (cpf.length !== 11) {
      return { invalidLength: true };
    }

    if (
      [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
      ].indexOf(cpf) !== -1
    ) {
      return { invalidRules: true };
    }

    for (let i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) {
      Resto = 0;
    }

    if (Resto != parseInt(cpf.substring(9, 10))) {
      return { invalidRules: true };
    }

    Soma = 0;

    for (let i = 1; i <= 10; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) {
      Resto = 0;
    }

    if (Resto != parseInt(cpf.substring(10, 11))) {
      return { invalidRules: true };
    }

    return null;
  };
}
