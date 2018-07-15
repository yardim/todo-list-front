import { Component, OnInit, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodosState } from 'src/app/store/state';
import { BaseAction } from 'src/app/store/base-action';
import { LOAD_TODOS } from 'src/app/store/todos.reducer';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
    this.store.dispatch(new BaseAction(LOAD_TODOS));

    this.store.select('todos')
      .subscribe(data => {
        console.log(data);
      })
  }
}
