import { AbstractControl, FormControl } from '@angular/forms';

export function matchPassword(firstPswdControl: FormControl) {
  return (currentPasswordField: AbstractControl): { [key: string]: any } | null => {
    const currentPswd: string = currentPasswordField.value;
    const firstPswd: string = firstPswdControl.value;
    console.log(firstPswd);
    console.log(currentPswd);

    return firstPswd !== currentPswd
      ? {
          'matchPassword': {
            value: 'Passwords does not match'
          }
        }
      : null;
  };
}
