import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { matchPassword } from './validations';
import { UserService } from '../services/user/user.service';
import { User } from '../entities/user';
import { STORAGE_KEYS } from '../config/config';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// TODO: add base component to avoid code duplication
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
// TODO: base component with unsubscribe logic to awoid memory leaks
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public password: FormGroup;
  public serverErrorMessage: string;
  public isFormPending: boolean;

  constructor(private userService: UserService) {}

  public ngOnInit() {
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

    this.signUpForm = new FormGroup({
      nameControl: new FormControl('', [Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      password: this.password
    });

    this.signUpForm.valueChanges
      .subscribe(this.resetServerErrorMessage.bind(this));
  }

  public onSubmit() {
    const user: User = {
      name: this.signUpForm.value.nameControl,
      email: this.signUpForm.value.emailControl,
      password: this.signUpForm.value.password.pswdControl
    };

    // TODO: handlers for enabling and disabling form
    this.signUpForm.disable();
    this.isFormPending = true;

    this.userService.createUser(user)
      .subscribe((data: any) => {
        this.isFormPending = false;
        this.signUpForm.enable();
        this.userService.setUserToStorage(data.token);
      }, (errorResponse: HttpErrorResponse) => {
        this.isFormPending = false;
        this.signUpForm.enable();
        this.getServerErrorMessage(errorResponse);
      });
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

  private resetServerErrorMessage(): void {
    if (this.serverErrorMessage) {
      this.serverErrorMessage = '';
    }
  }

  private getServerErrorMessage(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error.code === 11000) {
      this.serverErrorMessage = 'User with this email is already exists';
      return;
    }

    this.serverErrorMessage = errorResponse.error.message;
  }
}
