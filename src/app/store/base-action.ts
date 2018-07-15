import { Action } from '@ngrx/store';

export class BaseAction implements Action {
  readonly type: string;
  public payload: any;

  constructor(type: string, payload?: any) {
    this.type = type;
    this.payload = payload;
  }
}
