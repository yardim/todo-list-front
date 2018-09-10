import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoAppState, Todo } from '../store/state';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  public todos$: Observable<Todo[]>;

  constructor(private store: Store<TodoAppState>) {
    this.todos$ = this.store.pipe(
      select('todos'),
      map((state: TodoAppState): Todo[] => state.todos)
    );
  }

  ngOnInit() {
  }

}
