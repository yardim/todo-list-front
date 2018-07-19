import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { BaseAction } from './base-action';
import { LOAD_STATE, LOAD_STATE_SUCCESS } from 'src/app/store/todos.reducer';
import { BE_ROUTES, STORAGE_KEYS } from 'src/app/config/config';

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

      return this.http.post(url, {
        token: localStorage.getItem(STORAGE_KEYS.token)
      }).pipe(
        map(data => {
          return {
            type: LOAD_STATE_SUCCESS,
            payload: data
          };
        })
      );
    })
  );
}
