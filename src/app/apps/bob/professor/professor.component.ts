import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course';
import { FormControl } from '@angular/forms';
import { LectureService } from 'src/app/services/lecture.service';
import { RegularLecture, WEEKDAYS } from 'src/app/model/lecture';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'professor',
  templateUrl: 'professor.component.html',
})

export class ProfessorComponent implements OnInit {
  rawCourses: Course[];
  filteredCourses: Course[];

  selectedCourse: Course;
  selectedWeekday: WEEKDAYS;

  courseFormControl = new FormControl('');
  beginFormControl = new FormControl('');
  endFormControl = new FormControl('');
  locationFormControl = new FormControl('');

  loading = false;

  weekdays: WEEKDAYS[] = [
    WEEKDAYS.MONDAY,
    WEEKDAYS.TUESDAY,
    WEEKDAYS.WEDNESDAY,
    WEEKDAYS.THURSDAY,
    WEEKDAYS.FRIDAY,
  ];

  constructor(private courseService: CourseService, private lectureService: LectureService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.courseService.getCourses().valueChanges().subscribe((courses) => {
      this.rawCourses = courses;
      this.filter();
    })
  }

  filter() {
    this.filteredCourses = this.rawCourses.filter(c => c.name.toLowerCase().includes(this.courseFormControl.value.toLowerCase()));
  }

  setSelectedCourse(courseName: string) {
    this.selectedCourse = this.rawCourses.find((c) => {
      return courseName == c.name;
    });
  }

  setSelectedWeekday(weekday: WEEKDAYS) {
    console.log(weekday);
    this.selectedWeekday = weekday;
  }

  isValid() {
    let startDate: Date = new Date();
    startDate.setHours(+((this.beginFormControl.value as string).split(':')[0]));
    startDate.setMinutes(+((this.beginFormControl.value as string).split(':')[1]));

    let endDate: Date = new Date();
    endDate.setHours(+((this.endFormControl.value as string).split(':')[0]));
    endDate.setMinutes(+((this.endFormControl.value as string).split(':')[1]));

    var re = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')
    return !!this.selectedCourse &&
      this.beginFormControl.value.match(re) &&
      this.endFormControl.value.match(re) &&
      this.selectedWeekday &&
      this.locationFormControl.value &&
      endDate > startDate;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createLecture() {
    this.loading = true;
    let lec: any = new RegularLecture()
      .setCourse(this.selectedCourse)
      .setWeekday(this.selectedWeekday)
      .setStartHour(+((this.beginFormControl.value as string).split(':')[0]))
      .setStartMinute(+((this.beginFormControl.value as string).split(':')[1]))
      .setEndHour(+((this.endFormControl.value as string).split(':')[0]))
      .setEndMinute(+((this.endFormControl.value as string).split(':')[1]))
      .setLocation(this.locationFormControl.value);
    this.lectureService.createRegularLecture(JSON.parse(JSON.stringify(lec)));
    this.loading = false;

    this.openSnackBar('Vorlesung erstellt', 'Schleßen')

    this.courseFormControl.setValue('');
    this.beginFormControl.setValue('');
    this.endFormControl.setValue('');
    this.locationFormControl.setValue('');
  }
}
