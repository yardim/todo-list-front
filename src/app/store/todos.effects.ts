import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { BaseAction } from './base-action';
import { LOAD_TODOS, LOAD_TODOS_SUCCESS } from 'src/app/store/todos.reducer';
import { BE_ROUTES, STORAGE_KEYS } from 'src/app/config/config';

@Injectable()
export class TodosEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }

  @Effect()
  public todos$: Observable<BaseAction> = this.actions$.pipe(
    ofType(LOAD_TODOS),
    mergeMap(action => {
      const url: string = `${BE_ROUTES.base}${BE_ROUTES.todos}`

      return this.http.post(url, {
        token: localStorage.getItem(STORAGE_KEYS.token)
      }).pipe(
        map(data => {
          console.log(data);

          return {
            type: LOAD_TODOS_SUCCESS,
            payload: data
          };
        })
      );
    })
  );
}
