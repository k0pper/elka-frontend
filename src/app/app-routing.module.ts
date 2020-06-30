import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ChooserComponent } from './pages/app-chooser/chooser.component';


const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'chooser', component: ChooserComponent },
  {
    path: 'bob',
    loadChildren: () => import('./apps/bob/bob.module').then(m => m.BobModule)
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
