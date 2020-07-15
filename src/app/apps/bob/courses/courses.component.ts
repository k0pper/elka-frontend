import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course';
import { CourseService } from 'src/app/services/course.service';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScheduledSemester } from 'src/app/model/scheduled.semester';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  user: User;
  courses: Course[];
  tags: string[] = [];
  searchFormControl = new FormControl('');

  scheduledSemesters: ScheduledSemester[];

  constructor(private authService: AuthService, private courseService: CourseService, private userService: UserService) { }

  ngOnInit(): void {
    this.courseService.getCourses().valueChanges().subscribe((courses: Course[]) => {
      this.courses = courses;
      console.log(courses);
    });
    this.user = this.authService.getCurrentUser();
    this.scheduledSemesters = this.userService.getCurrentProgress(this.user).scheduledSemesters;
  }

  addTag() {
    this.tags.push(this.searchFormControl.value)
    this.searchFormControl.setValue("");
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.courses, event.previousIndex, event.currentIndex);
  }

}
