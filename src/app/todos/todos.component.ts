import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoAppState, TodoList } from 'src/app/store/state';
import { BaseAction } from 'src/app/store/base-action';
import { LOAD_STATE } from 'src/app/store/todos.reducer';
import { UserService } from 'src/app/services/user/user.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoListsService } from '../services/todo-lists/todo-lists.service';
import { STORAGE_KEYS } from 'src/app/config/config';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  public todoLists$: Observable<TodoList[]>;
  public isListFieldShown = false;
  public isTodoFieldShown = false;
  public userName = '';
  public formSwitcher: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public formCleaner: Subject<void> = new Subject();
  public selectedList$: Subject<string> = new Subject();
  public selectedList: string;

  constructor(
    private store: Store<TodoAppState>,
    private userService: UserService,
    private todoListsService: TodoListsService,
  ) { }

  ngOnInit() {
    this.userName = localStorage.getItem(STORAGE_KEYS.user);

    this.store.dispatch(new BaseAction(LOAD_STATE));

    this.todoLists$ = this.store.pipe(
      select('todoLists'),
      map((state: TodoAppState): TodoList[] => {
        // TODO: move this logic into todos service
        this.hideForms();
        this.formSwitcher.next(true);

        if (state.todoLists.length) {
          const listID = state.todoLists[0].id;
          this.selectList(listID);
        }

        return state.todoLists;
      }),
    );
  }

  logOut(): void {
    this.userService.removeUserFromStorage();
  }

  showListField() {
    this.isListFieldShown = true;
    this.formCleaner.next();
  }

  hideForms() {
    this.isListFieldShown = false;
    this.isTodoFieldShown = false;
  }

  addNewList(newListName: string) {
    this.formSwitcher.next(false);
    this.todoListsService.createNewTodoList(newListName);
  }

  showTodoForm() {
    this.isTodoFieldShown = true;
  }

  selectList(listID: string) {
    this.selectedList$.next(listID);
    this.selectedList = listID;
  }
}
