import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/model/course';
import { CourseService } from 'src/app/services/course.service';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ScheduledSemester } from 'src/app/model/scheduled.semester';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { Progress } from 'src/app/model/progress';
import { ScheduleService } from 'src/app/services/schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LectureService } from 'src/app/services/lecture.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AIDialogComponent } from './ai-dialog/ai-dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  user: User;

  courses: Course[];
  rawCourses: Course[];
  loaded = false;
  onlyShowRelevant = false;
  onlyShowNotFinished = false;

  tags: string[] = [];
  searchFormControl = new FormControl('');

  scheduledSemesters: ScheduledSemester[];

  courseList1: Course[];
  courseList2: Course[];
  courseList3: Course[];
  courseList4: Course[];

  dirty = false;
  saving = false;

  progress: Progress;

  constructor(private authService: AuthService, private courseService: CourseService, private userService: UserService,
    private scheduleService: ScheduleService, private lectureService: LectureService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.progress = this.userService.getCurrentProgress(this.user);
    this.scheduledSemesters = this.user.scheduledSemesters;

    this.courseList1 = this.scheduledSemesters[0].scheduledCourses;
    this.courseList2 = this.scheduledSemesters[1].scheduledCourses;
    this.courseList3 = this.scheduledSemesters[2].scheduledCourses;
    this.courseList4 = this.scheduledSemesters[3].scheduledCourses;

    this.courseService.getCourses().valueChanges().subscribe((courses: Course[]) => {
      if (!this.loaded) this.rawCourses = courses;
      this.loaded = true;
      this.courses = this.filterDoubles('', courses).sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        else return -1;
      });
    });
  }
  ngOnDestroy():void {
  }

  addTag() {
    let tag = this.searchFormControl.value;
    if (!this.tags.includes(tag)) {
      this.tags.push(tag)
    } else {
      this.openSnackBar("Tag schon enthalten", "Schließen")
    }
    this.searchFormControl.setValue("");
  }

  removeTag(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  dropScheduled(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);

      this.dirty = true;
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

  }

  removeSchedule(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      return;
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.dirty = true;
    }
    this.courses = this.filterDoubles('', this.courses);
  }

  saveSchedule() {
    this.saving = true;
    console.log("saving schedule");
    this.scheduledSemesters[0].scheduledCourses = this.courseList1;
    this.scheduledSemesters[1].scheduledCourses = this.courseList2;
    this.scheduledSemesters[2].scheduledCourses = this.courseList3;
    this.scheduledSemesters[3].scheduledCourses = this.courseList4;

    let progress = this.userService.getCurrentProgress(this.user)
    this.user.scheduledSemesters = this.scheduledSemesters;
    this.userService.createUpdateUser(this.user);

    this.dirty = false;
    this.saving = false;
    this.openSnackBar("Stundenplan gespeichert!", "Schließen")

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  filterDoubles(event, courses: Course[]): Course[] {
    let filteredCourses: Course[] = courses;
    filteredCourses = filteredCourses.filter(course => {
      return !this.courseList1.map(course => course.name).includes(course.name) &&
        !this.courseList2.map(course => course.name).includes(course.name) &&
        !this.courseList3.map(course => course.name).includes(course.name) &&
        !this.courseList4.map(course => course.name).includes(course.name)
    })
    return filteredCourses;
  }

  filterByRelevant(event, courses: Course[]): Course[] {
    if (!this.onlyShowRelevant) {
      return courses;
    } else {
      return courses.filter(course => {
        return this.user.plannedDegree.validCourses.map(validCourse => validCourse.name).includes(course.name);
      })
    }
  }

  filterByName(event, courses: Course[]): Course[] {
    return courses.filter(course => course.name.toLowerCase().includes((this.searchFormControl.value as string).toLowerCase()))
  }

  filterByIsDone(event, courses): Course[] {
    if (!this.onlyShowNotFinished) {
      return courses;
    } else {
      return courses.filter(course => {
        return !this.courseDone(course);
      })
    }
  }

  courseDone(course: Course) {
    return this.courseService.getDoneContentBlocksPercentage(this.user, course) >= 100;
  }

  filter() {
    let filtered1 = this.filterDoubles('', this.rawCourses);
    let filtered2 = this.filterByName('', filtered1);
    let filtered3 = this.filterByRelevant('', filtered2);
    let filtered4 = this.filterByIsDone('', filtered3);
    this.courses = filtered4;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AIDialogComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log("dialog closed")

    });
  }


}
