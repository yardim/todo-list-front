import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { STORAGE_KEYS, BE_ROUTES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class TodoListsService {

  constructor(
    private http: HttpClient
  ) { }

  createNewTodoList(name: string) {
    // TODO: create interceptor to add token to http requests
    console.log('createNewTodoList', name);

    // TODO: move current logic to effects
    const token = localStorage.getItem(STORAGE_KEYS.token);
    return this.http.post(`${BE_ROUTES.base}${BE_ROUTES.createList}`, {
      name,
      token,
    });
  }
}
