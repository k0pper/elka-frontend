import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { ScheduledSemester } from 'src/app/model/scheduled.semester';
import { Progress } from 'src/app/model/progress';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course';
import { Degree } from 'src/app/model/degree';
import { DegreeService } from 'src/app/services/degree.service';

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

  similarDegrees: Degree[];

  pieChartOptions: any = {
    legend: {
      display: false
    },
  }
  public pieChartLabels: string[] = ['Abgeschlossene ECTS', 'Fehlende ECTS'];
  public pieChartType: string = 'pie';
  public pieColors: any[] = [{ backgroundColor: ["#52B668", "rgb(255, 81, 81)"] }, { borderColor: ["black", "black"] }];

  constructor(private authService: AuthService, private userService: UserService, private courseService: CourseService, private degreeService: DegreeService) { }

  ngOnInit(): void {
    this.loading = true;
    this.user = this.authService.getCurrentUser();
    this.progress = this.userService.getCurrentProgress(this.user);
    this.loading = false;
    this.get3SimilarDegrees();
  }

  getCurrentSemester() {
    return this.userService.getCurrentProgress(this.user).currentSemester;
  }

  getFinishedEcts() {
    return this.userService.getFinishedEctsForDegree(this.user, this.user.plannedDegree);
  }

  getFinishedEctsForDegree(degree: Degree) {
    return this.userService.getFinishedEctsForDegree(this.user, degree);
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

  getNumOfFinishedCbForCourse(user: User, course: Course) {
    return this.courseService.getDoneContentBlocksForCourse(user, course);
  }

  getRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
  }

  get3SimilarDegrees() {
    let degrees: Degree[] = [];
    let rankingList: any[] = [];

    this.degreeService.getDegrees().valueChanges().subscribe((degs: Degree[]) => {
      degrees = degs;

      for (let d of degrees) {
        let ects = this.userService.getFinishedEctsForDegree(this.user, d);
        rankingList.push({
          'ects': ects,
          'degree': d
        });
      }


      rankingList = rankingList.sort((a, b) => {
        if (a.ects > b.ects) return -1;
        else return 1;
      })

      this.similarDegrees = [rankingList[0].degree, rankingList[1].degree, rankingList[2].degree]

    });
    console.log(degrees);

  }


}
