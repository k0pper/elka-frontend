import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { ScheduledSemester } from 'src/app/model/scheduled.semester';
import { Progress } from 'src/app/model/progress';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  user: User;

  // To access it better
  progress: Progress;

  loading = true;
  panelOpenState = false;

  constructor(private authService: AuthService, private userService: UserService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.loading = true;
    this.user = this.authService.getCurrentUser();
    this.progress = this.userService.getCurrentProgress(this.user);
    this.loading = false;
  }

  getCurrentSemester() {
    return this.userService.getCurrentProgress(this.user).currentSemester;
  }

  getFinishedEcts() {
    return this.userService.getFinishedEcts(this.user);
  }

  getRemainingEcts() {
    return this.userService.getRemainingEcts(this.user);
  }

  getTempo(): number {
    return this.userService.getTempo(this.user);
  }

  getEctsProgress(): number {
    return this.getFinishedEcts() / this.user.plannedDegree.ectsNeeded * 100;
  }

  getNumberOfPlannedCourses(): number {
    return this.userService.getNumberOfPlannedCourses(this.user);
  }

  getProgressWidth(user: User, course: Course) {
    return this.courseService.getDoneContentBlocksPercentage(user, course) + '%';
  }

}
