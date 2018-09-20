import { Injectable } from '@angular/core';

import { STORAGE_KEYS } from '../../config/config';
import { Store } from '@ngrx/store';
import { TodoAppState } from 'src/app/store/state';
import { BaseAction } from 'src/app/store/base-action';
import {
  CREATE_TODO,
  REMOVE_TODO,
  EDIT_TODO
} from '../../store/todos.reducer';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(
    private store: Store<TodoAppState>,
  ) { }

  createNewTodo(value: string, listID): void {
    this.store.dispatch(new BaseAction(CREATE_TODO, { value, listID }));
  }

  removeTodo(): void {
  }

  editTodoName() {
  }
}
