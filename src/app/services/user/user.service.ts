import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from '../../entities/user';
import { BE_ROUTES, STORAGE_KEYS } from '../../config/config';
import { TodoAppState } from '../../store/state';
import { CLEAR_STATE } from '../../store/todos.reducer';
import { BaseAction } from '../../store/base-action';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<TodoAppState>
  ) { }

  public createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${BE_ROUTES.base}${BE_ROUTES.createUser}`, user);
  }

  public logIn(user: User): Observable<Object> {
    return this.httpClient.post(`${BE_ROUTES.base}${BE_ROUTES.logIn}`, user);
  }

  public setUserToStorage(user: any): void {
    localStorage.setItem(STORAGE_KEYS.token, user.token);
    localStorage.setItem(STORAGE_KEYS.user, user.name);
    this.router.navigate(['/todos']);
  }

  public removeUserFromStorage(): void {
    localStorage.removeItem(STORAGE_KEYS.token);
    this.router.navigate(['/enter']);
    this.store.dispatch(new BaseAction(CLEAR_STATE))
  }
}
