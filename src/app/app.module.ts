import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from './services/user/user.service';
import { LogInComponent } from './log-in/log-in.component';
import { EnterViewComponent } from './enter-view/enter-view.component';
import { TodosComponent } from 'src/app/todos/todos.component';

import { routes } from './routes';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    EnterViewComponent,
    TodosComponent,
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
