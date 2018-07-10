import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/entities/user';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { STORAGE_KEYS } from 'src/app/config/config';
import { Router } from '@angular/router';


// TODO: add base component to avoid code duplication
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public logInForm: FormGroup;
  public isFormPending: boolean;
  public serverErrorMessage: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.logInForm = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    this.logInForm.valueChanges
      .subscribe(this.resetServerErrorMessage.bind(this));
  }

  onSubmit() {
    const user: User = {
      email: this.logInForm.value.emailControl,
      password: this.logInForm.value.password,
    };

    this.isFormPending = true;
    this.logInForm.disable();

    this.userService.logIn(user)
      .subscribe(
        (data: any) => {
          localStorage.setItem(STORAGE_KEYS.token, data.token);
          this.isFormPending = false;
          this.logInForm.enable();
          this.router.navigate(['/todos']);
        },
        (errorResponse: HttpErrorResponse) => {
          this.isFormPending = false;
          this.logInForm.enable();
          this.serverErrorMessage = errorResponse.error.errorMessage
        }
      );
  }

  private resetServerErrorMessage(): void {
    if (this.serverErrorMessage) {
      this.serverErrorMessage = '';
    }
  }
}
