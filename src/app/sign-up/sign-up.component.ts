import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { matchPassword } from './validations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public nameControl: FormControl;
  public emailControl: FormControl;
  public pswdControl: FormControl;
  public pswdSecondControl: FormControl;

  ngOnInit() {
    this.nameControl = new FormControl('', [ Validators.required ]);
    this.emailControl = new FormControl('', [ Validators.required, Validators.email ]);
    // TODO: add mathc password validaion using form group
    // http://www.codiodes.com/match-password-validation/
    this.pswdControl = new FormControl('', [
      Validators.minLength(6),
      Validators.required
    ]);
    this.pswdSecondControl = new FormControl('', [
      Validators.minLength(6),
      Validators.required,
      matchPassword(this.pswdControl)
    ]);
  }
}
