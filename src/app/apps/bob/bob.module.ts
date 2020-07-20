import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BobComponent } from './bob.component';
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
import { ScheduledCourseComponent } from './courses/course-progress-thumbnail/scheduled-course-thumbnail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DegreesComponent } from './degrees/degrees.component';
import { DegreeComponent } from './degrees/degree/degree-thumbnail.component';
import { DegreeDetailsComponent, AreYouSureDialog } from './degrees/degree-details/degree-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { ChartsModule } from 'ng2-charts';
import { MatDividerModule } from '@angular/material/divider';
import { ProfessorComponent } from './professor/professor.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    BobRoutingModule,

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
    MatSnackBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatSidenavModule,
    MatBadgeModule,
    ChartsModule,
    MatDividerModule,
    MatSelectModule,
    MatAutocompleteModule,

    FlexLayoutModule,
  ],
  exports: [],
  declarations: [
    BobComponent,
    OverviewComponent,
    CoursesComponent,
    ScheduledCourseComponent,
    CourseComponent,
    DegreesComponent,
    DegreeComponent,
    DegreeDetailsComponent,
    AreYouSureDialog,
    AdminComponent,
    ProfessorComponent
  ],
})
export class BobModule { }
