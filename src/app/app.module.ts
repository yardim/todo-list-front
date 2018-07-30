import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from './services/user/user.service';
import { TodoListsService } from './services/todo-lists/todo-lists.service';
import { LogInComponent } from './log-in/log-in.component';
import { EnterViewComponent } from './enter-view/enter-view.component';
import { TodosComponent } from 'src/app/todos/todos.component';

import { routes } from './routes';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

import { todoListsReducer } from './store/todos.reducer';
import { TodosEffects } from 'src/app/store/todos.effects';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    EnterViewComponent,
    TodosComponent,
    TodoListItemComponent,
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
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    StoreModule.forRoot({
      todoLists: todoListsReducer
    }),
    EffectsModule.forRoot([
      TodosEffects
    ])
  ],
  providers: [
    UserService,
    AuthGuardService,
    TodoListsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
