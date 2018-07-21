import { BaseAction } from './base-action';
import { TodoAppState, initialTodoListsState, Todo, TodoList } from './state';

export const LOAD_STATE = 'LOAD_STATE';
export const LOAD_STATE_SUCCESS = 'LOAD_STATE_SUCCESS';
export const LOAD_STATE_FAIL = 'LOAD_STATE_FAIL';

export const CREATE_TODO_LIST = 'CREATE_TODO_LIST';
export const CREATE_TODO_LIST_SUCCESS = 'CREATE_TODO_LIST_SUCCESS';
export const CREATE_TODO_LIST_FAIL = 'CREATE_TODO_LIST_SUCCESS';

export function todoListsReducer(state: TodoAppState = initialTodoListsState, action: BaseAction): TodoAppState {
  switch (action.type) {
    case LOAD_STATE:
    case LOAD_STATE_FAIL:
      return state;

    case LOAD_STATE_SUCCESS:
      const payload = action.payload;

      const todoLists = payload.map(todoList => {
        return {
          id: todoList.id,
          name: todoList.name
        }
      });

      const todos = payload.reduce((currentTodos: Todo[], todoList: TodoList): Todo[] => {
        return todoList.todos.concat(currentTodos)
      }, []);

      const newState = {
        todoLists,
        todos
      };

      return newState;

    case CREATE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoLists: [
          ...state.todoLists,
          action.payload
        ]
      };

    default:
      return state;
  }
}
