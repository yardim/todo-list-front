import { BaseAction } from './base-action';
import { TodosState, initialState } from './state';

export const LOAD_TODOS: string = 'LOAD_TODOS';
export const LOAD_TODOS_SUCCESS: string = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAIL: string = 'LOAD_TODOS_FAIL';

export function todosReducer(state: TodosState = initialState, action: BaseAction): TodosState {
  switch (action.type) {
    case LOAD_TODOS:
    case LOAD_TODOS_FAIL:
      console.log(action);
      return state;
    case LOAD_TODOS_SUCCESS:
      console.log(action);
      return state;
    default:
      return state;
  }
}
