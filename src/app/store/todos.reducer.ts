import { BaseAction } from './base-action';
import { TodoAppState, initialTodoListsState, Todo, TodoList } from './state';

export const LOAD_STATE = 'LOAD_STATE';
export const LOAD_STATE_SUCCESS = 'LOAD_STATE_SUCCESS';
export const LOAD_STATE_FAIL = 'LOAD_STATE_FAIL';

export const CREATE_TODO_LIST = 'CREATE_TODO_LIST';
export const CREATE_TODO_LIST_SUCCESS = 'CREATE_TODO_LIST_SUCCESS';
export const CREATE_TODO_LIST_FAIL = 'CREATE_TODO_LIST_FAIL';

export const REMOVE_TODO_LIST = 'REMOVE_TODO_LIST';
export const REMOVE_TODO_LIST_SUCCESS = 'REMOVE_TODO_LIST_SUCCESS';
export const REMOVE_TODO_LIST_FAIL = 'REMOVE_TODO_LIST_FAIL';

export const EDIT_TODO_LIST_NAME = 'EDIT_TODO_LIST_NAME';
export const EDIT_TODO_LIST_NAME_SUCCESS = 'EDIT_TODO_LIST_NAME_SUCCESS';
export const EDIT_TODO_LIST_NAME_FAIL = 'EDIT_TODO_LIST_NAME_FAIL';

export const CLEAR_STATE = 'CLEAR_STATE';

export function todoListsReducer(state: TodoAppState = initialTodoListsState, action: BaseAction): TodoAppState {
  let payload;

  switch (action.type) {
    case LOAD_STATE:
    case LOAD_STATE_FAIL:
    case REMOVE_TODO_LIST:
    case REMOVE_TODO_LIST_FAIL:
      return state;

    case CLEAR_STATE:
      return initialTodoListsState;

    case LOAD_STATE_SUCCESS:
      payload = action.payload;

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
      const id = action.payload._id;
      delete action.payload._id;

      return {
        ...state,
        todoLists: [
          ...state.todoLists,
          {
            ...action.payload,
            id
          }
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

    case EDIT_TODO_LIST_NAME_SUCCESS:
      const index = state.todoLists
        .findIndex((todoList: TodoList, index: number, lists: TodoList[]) => {
          return action.payload._id === todoList.id;
        });

      return {
        ...state,
        todoLists: [
          ...state.todoLists.slice(0, index),
          {
            ...state.todoLists[index],
            name: action.payload.name
          },
          ...state.todoLists.slice(index + 1)
        ]
      }

    case CREATE_TODO_LIST_FAIL:
    case EDIT_TODO_LIST_NAME_FAIL:
      return { ...state }

    default:
      return state;
  }
}
