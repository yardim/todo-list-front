import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { map, mergeMap, filter, tap } from 'rxjs/operators';
import { TodoAppState, Todo } from '../store/state';
import { TodosService } from '../services/todos/todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  public todos$: Observable<Todo[]>;
  public formSwitcher: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public formCleaner: Subject<void> = new Subject();
  @Input() public isFormShown: boolean;
  @Input() public selectedList$: Subject<string>;

  private currentListID: string;

  constructor(
    private store: Store<TodoAppState>,
    private todosService: TodosService
  ) { }

  public ngOnInit(): void {
    const allTodos$ = this.store.pipe(
      select('todos'),
      map((state: TodoAppState): Todo[] => state.todos),
    );

    this.todos$ = this.selectedList$.pipe(
      tap(listID => this.currentListID = listID),
      mergeMap(listID => allTodos$.pipe(
        map((todos: Todo[]) => todos.filter(todo => todo.listID === listID))
      ))
    );
  }

  public addNewTodo(todo: string): void {
    this.formSwitcher.next(false);
    this.todosService.createNewTodo(todo, this.currentListID);

    setTimeout(() => {
      console.log(this.currentListID);
    }, 2000);
  }

  private hideForm() {
    this.formCleaner.next();
    this.formSwitcher.next(true);
  }
}
