import { Component, OnInit, Input } from '@angular/core';
import { TodoList } from 'src/app/store/state';
import { TodoListsService } from '../services/todo-lists/todo-lists.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  public isProcessing: boolean = false;

  @Input()
  public todoList: TodoList;

  constructor(private todoListsServise: TodoListsService) {}

  ngOnInit() {}

  removeTodoList(id: string): void {
    // TODO: add progress indicator
    this.todoListsServise.removeTodoList(id);
  }
}
