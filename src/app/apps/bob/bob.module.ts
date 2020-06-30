import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BobComponent } from './bob.component';
import { Routes, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { OverviewComponent } from './overview/overview.component';
import { BobRoutingModule } from './bob.routing.module';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BobRoutingModule,
  ],
  exports: [],
  declarations: [BobComponent, OverviewComponent],
})
export class BobModule { }
