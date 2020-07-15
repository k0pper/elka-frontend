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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminComponent } from './admin/admin.component';
import { CoursesComponent } from './courses/courses.component';
import { MatInputModule } from '@angular/material/input';
import { CourseComponent } from './courses/course-search-thumbnail/course.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseProgressComponent } from './courses/course-progress-thumbnail/course-progress-thumbnail.component';


@NgModule({
  imports: [
    CommonModule,
    BobRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatInputModule,
    DragDropModule,
    MatFormFieldModule,

    FlexLayoutModule
  ],
  exports: [],
  declarations: [BobComponent, OverviewComponent, CoursesComponent, CourseComponent, CourseProgressComponent, AdminComponent,],
})
export class BobModule { }
