export interface TodoList {
  id: string;
  name: string;
}

export interface TodoListsState {
  todoLists: TodoList[];
}

export const initialTodoListsState: TodoListsState = {
  todoLists: [],
};
