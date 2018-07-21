import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { BaseAction } from './base-action';
import { LOAD_STATE, LOAD_STATE_SUCCESS, CREATE_TODO_LIST, CREATE_TODO_LIST_SUCCESS, CREATE_TODO_LIST_FAIL } from 'src/app/store/todos.reducer';
import { BE_ROUTES, STORAGE_KEYS } from 'src/app/config/config';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class TodosEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }

  @Effect()
  public todos$: Observable<BaseAction> = this.actions$.pipe(
    ofType(LOAD_STATE),
    mergeMap(action => {
      const url = `${BE_ROUTES.base}${BE_ROUTES.todos}`;
      const token = localStorage.getItem(STORAGE_KEYS.token);

      return this.http.post(url, { token }).pipe(
        map(data => ({
          type: LOAD_STATE_SUCCESS,
          payload: data
        }))
      )
    })
  );

  @Effect()
  public createTodoList$: Observable<BaseAction> = this.actions$.pipe(
    ofType(CREATE_TODO_LIST),
    mergeMap((action: BaseAction) => {
      const url = `${BE_ROUTES.base}${BE_ROUTES.createList}`;
      const payload = action.payload;

      return this.http.post(url, payload).pipe(
        map(data => {
          return new BaseAction(CREATE_TODO_LIST_SUCCESS, data);
        }),
        catchError(
          () => of(new BaseAction(CREATE_TODO_LIST_FAIL))
        )
      );
    })
  )
}
