import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { STORAGE_KEYS, BE_ROUTES } from '../../config/config';
import { Store } from '@ngrx/store';
import { TodoAppState } from 'src/app/store/state';
import { BaseAction } from 'src/app/store/base-action';
import { CREATE_TODO_LIST, REMOVE_TODO_LIST } from 'src/app/store/todos.reducer';

@Injectable({
  providedIn: 'root'
})
export class TodoListsService {

  constructor(
    private http: HttpClient,
    private store: Store<TodoAppState>,
  ) { }

  createNewTodoList(name: string): void {
    // TODO: create interceptor to add token to http requests
    console.log('createNewTodoList', name);
    const token = localStorage.getItem(STORAGE_KEYS.token);

    // TODO: move current logic to effects
    this.store.dispatch(new BaseAction(CREATE_TODO_LIST, { name, token }));
  }

  removeTodoList(name: string): void {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    this.store.dispatch(new BaseAction(REMOVE_TODO_LIST, { name, token }));
  }
}
