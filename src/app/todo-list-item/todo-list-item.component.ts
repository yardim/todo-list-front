import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { TodoList, TodoAppState } from 'src/app/store/state';
import { TodoListsService } from '../services/todo-lists/todo-lists.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  public isProcessing: boolean = false;
  public isEditMode: boolean = false;
  public listNameForm: FormGroup;
  public listNameInput: FormControl;

  @Input()
  public todoList: TodoList;

  constructor(
    private todoListsServise: TodoListsService,
    private renderer: Renderer,
    private todoListsService: TodoListsService,
    private store: Store<TodoAppState>
  ) {}

  public ngOnInit() {
    this.listNameInput = new FormControl(this.todoList.name);
    this.listNameForm = new FormGroup({
      listNameInput: this.listNameInput
    });
  }

  public removeTodoList(id: string): void {
    if (this.isProcessing) {
      return;
    }

    if (this.isEditMode) {
      this.isEditMode = false;
      return;
    }

    this.isProcessing = true;
    this.todoListsServise.removeTodoList(id);
  }

  public onEdit(id: string): void {
    this.editListName(id);
  }

  public onEditSubmit(id: string): void {
    this.editListName(id);
  }

  private editListName(id: string): void {
    if (this.isEditMode) {
      this.isProcessing = true;
      this.listNameForm.disable();
      this.todoListsService.editTodoListName(id, this.listNameInput.value);
    } else {
      this.isEditMode = true;
    }
  }
}
