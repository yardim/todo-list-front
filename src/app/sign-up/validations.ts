import { FormGroup } from '@angular/forms';

export function matchPassword(password: FormGroup) {
  const pswd: string = password.controls.pswdControl.value;
  const pswdRepeat: string = password.controls.pswdSecondControl.value;

  if (pswd !== pswdRepeat) {
    return {
      matchPassword: true
    };
  }

  return null;
}
