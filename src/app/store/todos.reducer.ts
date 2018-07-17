import { BaseAction } from './base-action';
import { TodoListsState, initialTodoListsState } from './state';

export const LOAD_TODOS: string = 'LOAD_TODOS';
export const LOAD_TODOS_SUCCESS: string = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAIL: string = 'LOAD_TODOS_FAIL';

export function todoListsReducer(state: TodoListsState = initialTodoListsState, action: BaseAction): TodoListsState {
  switch (action.type) {
    case LOAD_TODOS:
    case LOAD_TODOS_FAIL:
      return state;

    case LOAD_TODOS_SUCCESS:
      const todoLists = action.payload.map(todoList => ({
        id: todoList.id,
        name: todoList.name
      }));

      return {
        todoLists
      };

    default:
      return state;
  }
}
