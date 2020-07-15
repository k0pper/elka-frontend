import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { ScheduledSemester } from 'src/app/model/scheduled.semester';
import { Progress } from 'src/app/model/progress';

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

  constructor(private authService: AuthService, private userService: UserService) { }

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
    let finishedEcts = this.userService.getFinishedEcts(this.user)
    let currentProgress = this.userService.getCurrentProgress(this.user);
    if (currentProgress.currentSemester == 1) {
      return finishedEcts;
    }
    return finishedEcts / (currentProgress.currentSemester - 1);
  }

  getEctsProgress(): number {
    return this.getFinishedEcts() / this.user.plannedDegree.ectsNeeded * 100;
  }

  getNumberOfPlannedCourses(): number {
    let numOfPlannedCourses = 0;
    for (let semester of this.progress.scheduledSemesters) {
      for (let c of semester.scheduledCourses) {
        numOfPlannedCourses += 1;
      }
    }
    return numOfPlannedCourses;
  }

}
