import { Routes } from '@angular/router/src/config';
import { EnterViewComponent } from 'src/app/enter-view/enter-view.component';
import { TodosComponent } from 'src/app/todos/todos.component';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

export const routes: Routes = [
  { path: 'enter', component: EnterViewComponent },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [ AuthGuardService ]
  },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: '**', redirectTo: '/todos' },
];
