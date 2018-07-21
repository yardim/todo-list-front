import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { STORAGE_KEYS, BE_ROUTES } from '../../config/config';
import { Store } from '@ngrx/store';
import { TodoAppState } from 'src/app/store/state';
import { BaseAction } from 'src/app/store/base-action';
import { CREATE_TODO_LIST } from 'src/app/store/todos.reducer';

@Injectable({
  providedIn: 'root'
})
export class TodoListsService {

  constructor(
    private http: HttpClient,
    private store: Store<TodoAppState>,
  ) { }

  createNewTodoList(name: string) {
    // TODO: create interceptor to add token to http requests
    console.log('createNewTodoList', name);

    // TODO: move current logic to effects
    const token = localStorage.getItem(STORAGE_KEYS.token);
    this.store.dispatch(new BaseAction(CREATE_TODO_LIST, { name, token }));
  }
}
