import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoListsState, TodoList } from 'src/app/store/state';
import { BaseAction } from 'src/app/store/base-action';
import { LOAD_TODOS } from 'src/app/store/todos.reducer';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  public todoLists$: Observable<TodoList[]>;

  constructor(
    private store: Store<TodoListsState>,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.store.dispatch(new BaseAction(LOAD_TODOS));
    this.todoLists$ = this.store.pipe(
      select('todoLists'),
      map((state: TodoListsState): TodoList[] => state.todoLists)
    );
  }

  logOut(): void {
    this.userService.removeUserFromStorage();
  }
}
