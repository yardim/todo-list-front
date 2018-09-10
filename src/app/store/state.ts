export interface TodoList {
  id: string;
  name: string;
  todos?: Todo[];
}

export interface Todo {
  name: string;
  isDone: boolean;
}

export interface TodoAppState {
  todoLists: TodoList[];
  todos: Todo[];
}

export const initialTodoListsState: TodoAppState = {
  todoLists: [],
  todos: []
};
