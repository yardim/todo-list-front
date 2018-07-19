import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoAppState, TodoList } from 'src/app/store/state';
import { BaseAction } from 'src/app/store/base-action';
import { LOAD_STATE } from 'src/app/store/todos.reducer';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoListsService } from '../services/todo-lists/todo-lists.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  public todoLists$: Observable<TodoList[]>;
  public listFieldForm: FormGroup;
  public isListFieldShown = false;
  public addingListError = 'Field is required';

  constructor(
    private store: Store<TodoAppState>,
    private userService: UserService,
    private todoListsService: TodoListsService,
  ) { }

  ngOnInit() {
    this.store.dispatch(new BaseAction(LOAD_STATE));
    this.todoLists$ = this.store.pipe(
      select('todoLists'),
      map((state: TodoAppState): TodoList[] => state.todoLists)
    );

    this.listFieldForm = new FormGroup({
      listField: new FormControl('', Validators.required)
    });

    this.listFieldForm.valueChanges
      .subscribe(() => this.addingListError = 'Field is required');
  }

  logOut(): void {
    this.userService.removeUserFromStorage();
  }

  showListField() {
    this.isListFieldShown = !this.isListFieldShown;
    this.listFieldForm.reset();
  }

  addNewList() {
    const newListName = this.listFieldForm.value.listField;
    this.todoListsService.createNewTodoList(newListName)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
