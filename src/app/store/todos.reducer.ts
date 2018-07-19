import { BaseAction } from './base-action';
import { TodoAppState, initialTodoListsState, Todo } from './state';

export const LOAD_STATE = 'LOAD_STATE';
export const LOAD_STATE_SUCCESS = 'LOAD_STATE_SUCCESS';
export const LOAD_STATE_FAIL = 'LOAD_STATE_FAIL';

export function todoListsReducer(state: TodoAppState = initialTodoListsState, action: BaseAction): TodoAppState {
  switch (action.type) {
    case LOAD_STATE:
    case LOAD_STATE_FAIL:
      return state;

    case LOAD_STATE_SUCCESS:
      const payload = action.payload;

      const todoLists = payload.map(todoList => ({
        id: todoList.id,
        name: todoList.name
      }));

      const todos = payload.reduce((allTodos: Todo[], currentTodos: Todo[]): Todo[] => (
        allTodos.concat(currentTodos)
      ), []);

      const newState = {
        todoLists,
        todos
      };

      return newState;

    default:
      return state;
  }
}
