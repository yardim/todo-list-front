import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { matchPassword } from './validations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public nameControl: FormControl;
  public emailControl: FormControl;
  public password: FormGroup;
  public pswdControl: FormControl;
  public pswdSecondControl: FormControl;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.nameControl = new FormControl('', [ Validators.required ]);
    this.emailControl = new FormControl('', [ Validators.required, Validators.email ]);

    this.password = new FormGroup({
      pswdControl: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ]),
      pswdSecondControl: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ])
    }, [
        matchPassword
    ]);
  }

  public getErrorMessage(errors: any): string {
    if (!errors) {
      return '';
    }

    if (errors.required) {
      return 'This field is required';
    }

    if (errors.email) {
      return 'Email should be valid';
    }

    if (errors.minlength) {
      return `This field should contain minimum ${errors.minlength.requiredLength} symbols`;
    }

    if (errors.matchPassword) {
      return 'Passwords should match';
    }
  }
}
