import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { BaseAction } from './base-action';
import {
  LOAD_STATE,
  LOAD_STATE_SUCCESS,
  CREATE_TODO_LIST,
  CREATE_TODO_LIST_SUCCESS,
  CREATE_TODO_LIST_FAIL,
  REMOVE_TODO_LIST,
  REMOVE_TODO_LIST_SUCCESS,
  REMOVE_TODO_LIST_FAIL,
  LOAD_STATE_FAIL,
  EDIT_TODO_LIST_NAME,
  EDIT_TODO_LIST_NAME_SUCCESS,
  EDIT_TODO_LIST_NAME_FAIL,
  CREATE_TODO,
  CREATE_TODO_SUCCESS
} from 'src/app/store/todos.reducer';
import { BE_ROUTES, STORAGE_KEYS } from 'src/app/config/config';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class TodosEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private router: Router
  ) { }

  @Effect()
  public todos$: Observable<BaseAction> = this.actions$.pipe(
    ofType(LOAD_STATE),
    mergeMap(action => {
      const url = `${BE_ROUTES.base}${BE_ROUTES.todos}`;

      return this.http.get(url).pipe(
        map(data => ({
          type: LOAD_STATE_SUCCESS,
          payload: data
        })),
        catchError(err => {
          console.log(err);
          this.router.navigateByUrl('/enter');
          return of(new BaseAction(LOAD_STATE_FAIL));
        })
      );
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
          (err) => {
            console.error(err);
            return of(new BaseAction(CREATE_TODO_LIST_FAIL));
          }
        )
      );
    })
  );

  @Effect()
  public removeTodoList$: Observable<BaseAction> = this.actions$.pipe(
    ofType(REMOVE_TODO_LIST),
    mergeMap((action: BaseAction) => {
      const url = `${BE_ROUTES.base}${BE_ROUTES.deleteList}`;
      const id = action.payload.id;

      return this.http.delete(`${url}${id}`);
    }),
    map(data => {
      return new BaseAction(REMOVE_TODO_LIST_SUCCESS, data);
    }),
    catchError(() => of(new BaseAction(REMOVE_TODO_LIST_FAIL)))
  );

  @Effect()
  public editTodoListName$: Observable<BaseAction> = this.actions$.pipe(
    ofType(EDIT_TODO_LIST_NAME),
    mergeMap((action: BaseAction) => {
      const url = `${BE_ROUTES.base}${BE_ROUTES.updateList}`;
      const id = action.payload.id;

      return this.http.put(`${url}${id}`, {
        name: action.payload.name
      });
    }),
    map(data => {
      return new BaseAction(EDIT_TODO_LIST_NAME_SUCCESS, data);
    }),
    catchError(() => of(new BaseAction(EDIT_TODO_LIST_NAME_FAIL)))
  );

  @Effect()
  public createNewTodo: Observable<BaseAction> = this.actions$.pipe(
    ofType(CREATE_TODO),
    mergeMap((action: BaseAction): any => {
      const listID = action.payload.listID;
      const value = action.payload.value;
      const url = `${BE_ROUTES.base}${BE_ROUTES.createTodo}${listID}`;
      console.log(url);

      return this.http.post(url, { value });
    }),
    map(data => {
      console.log(data);
      return new BaseAction(CREATE_TODO_SUCCESS, data);
    })
  );
}
