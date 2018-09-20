import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { STORAGE_KEYS } from '../../config/config';
import { Store } from '@ngrx/store';
import { TodoAppState } from 'src/app/store/state';
import { BaseAction } from 'src/app/store/base-action';
import {
  CREATE_TODO_LIST,
  REMOVE_TODO_LIST,
  EDIT_TODO_LIST_NAME
} from '../../store/todos.reducer';

@Injectable({
  providedIn: 'root'
})
export class TodoListsService {

  constructor(
    private http: HttpClient,
    private store: Store<TodoAppState>,
  ) { }

  createNewTodoList(name: string): void {
    this.store.dispatch(new BaseAction(CREATE_TODO_LIST, { name }));
  }

  removeTodoList(id: string): void {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    this.store.dispatch(new BaseAction(REMOVE_TODO_LIST, { id, token }));
  }

  editTodoListName(id: string, name: string) {
    this.store.dispatch(new BaseAction(EDIT_TODO_LIST_NAME, { id, name }));
  }
}
