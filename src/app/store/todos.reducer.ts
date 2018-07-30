import { BaseAction } from './base-action';
import { TodoAppState, initialTodoListsState, Todo, TodoList } from './state';

export const LOAD_STATE = 'LOAD_STATE';
export const LOAD_STATE_SUCCESS = 'LOAD_STATE_SUCCESS';
export const LOAD_STATE_FAIL = 'LOAD_STATE_FAIL';

export const CREATE_TODO_LIST = 'CREATE_TODO_LIST';
export const CREATE_TODO_LIST_SUCCESS = 'CREATE_TODO_LIST_SUCCESS';
export const CREATE_TODO_LIST_FAIL = 'CREATE_TODO_LIST_SUCCESS';

export const REMOVE_TODO_LIST = 'REMOVE_TODO_LIST';
export const REMOVE_TODO_LIST_SUCCESS = 'REMOVE_TODO_LIST_SUCCESS';
export const REMOVE_TODO_LIST_FAIL = 'REMOVE_TODO_LIST_FAIL';

export function todoListsReducer(state: TodoAppState = initialTodoListsState, action: BaseAction): TodoAppState {
  switch (action.type) {
    case LOAD_STATE:
    case LOAD_STATE_FAIL:
    case REMOVE_TODO_LIST:
    case REMOVE_TODO_LIST_FAIL:
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

    case REMOVE_TODO_LIST_SUCCESS:
      const removedListId = action.payload._id;
      const indexRemoved = state.todoLists.findIndex(list => list.id === removedListId);

      return {
        ...state,
        todoLists: [
          ...state.todoLists.slice(0, indexRemoved),
          ...state.todoLists.slice(indexRemoved + 1)
        ]
      };

    default:
      return state;
  }
}
