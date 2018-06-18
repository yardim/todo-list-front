import { FormGroup } from '@angular/forms';

export function matchPassword(password: FormGroup) {
  const pswd: string = password.controls.pswdControl.value;
  const pswdRepeat: string = password.controls.pswdSecondControl.value;
  let pswdErrors = password.controls.pswdControl.errors;
  let confirmErrors = password.controls.pswdSecondControl.errors;

  if (pswd !== pswdRepeat) {
    pswdErrors = pswdErrors || {};
    confirmErrors = confirmErrors || {};
    pswdErrors.matchPassword = true;
    confirmErrors.matchPassword = true;
    password.controls.pswdControl.setErrors(pswdErrors);
    password.controls.pswdSecondControl.setErrors(confirmErrors);

    return { matchPassword: true };
  }

  pswdErrors = removeMatchPasswordError(pswdErrors);
  confirmErrors = removeMatchPasswordError(confirmErrors);

  password.controls.pswdControl.setErrors(pswdErrors);
  password.controls.pswdSecondControl.setErrors(confirmErrors);

  return null;
}

function removeMatchPasswordError(errObj: any) {
  if (errObj === null) {
    return null;
  }

  if (errObj.matchPassword && Object.keys(errObj).length > 1) {
    delete errObj.matchPassword;
    return { ...errObj };
  }

  if (errObj.matchPassword && Object.keys(errObj).length === 1) {
    return null;
  }

  return { ...errObj };
}
