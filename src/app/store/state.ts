export interface TodoList {
  id: string;
  name: string;
  todos?: Todo[]
}

export interface Todo {
  id: string;
  name: string;
}

export interface TodoAppState {
  todoLists: TodoList[];
  todos: Todo[];
}

export const initialTodoListsState: TodoAppState = {
  todoLists: [],
  todos: []
};
