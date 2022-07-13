import { AbstractControl, ValidatorFn } from '@angular/forms';
import { luhnCheck } from './luhnCheck';

export function luhnValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isValid = luhnCheck(control.value);
    return isValid ? null : { luhnCheck: isValid };
  };
}
