import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  user: User;
  loading = true;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.user = this.authService.getCurrentUser();
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
    let tempo = this.userService.getFinishedEcts(this.user) /
      this.userService.getCurrentProgress(this.user).semestersStudied;
    return tempo;
  }

  getEctsProgress(): number {
    return this.getFinishedEcts() / this.user.plannedDegree.ectsNeeded * 100;
  }

}
