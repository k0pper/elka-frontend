//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BobComponent } from './bob.component';
import { OverviewComponent } from './overview/overview.component';

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
