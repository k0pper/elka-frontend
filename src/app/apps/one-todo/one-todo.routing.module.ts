//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OneTodoComponent } from './one-todo.component';
import { CalendarComponent } from './calendar/calendar.component';


const routes: Routes = [
  {
    path: '', component: OneTodoComponent, children: [
      {
        path: 'calendar', component: CalendarComponent
      },
      {
        path: '**',
        redirectTo: 'calendar',
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneTodoRoutingModule { }
