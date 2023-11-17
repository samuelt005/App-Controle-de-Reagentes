import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      hasMinLength &&
      hasNumber &&
      hasLowerCase &&
      hasUpperCase &&
      hasSpecialChar
    ) {
      return null;
    } else {
      return { notValid: true };
    }
  };
}
