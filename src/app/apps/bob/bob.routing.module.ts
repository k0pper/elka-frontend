//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BobComponent } from './bob.component';
import { OverviewComponent } from './overview/overview.component';
import { AdminComponent } from './admin/admin.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {
    path: '', component: BobComponent, children: [
      {
        path: 'overview', component: OverviewComponent
      },
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'admin',
        component: AdminComponent,
        pathMatch: 'full'
      },
      {
        path: 'courses',
        component: CoursesComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'overview',
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BobRoutingModule { }
