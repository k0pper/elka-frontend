import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Degree } from 'src/app/model/degree';
import { DegreeService } from 'src/app/services/degree.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.scss']
})
export class DegreesComponent implements OnInit {
  user: User;
  degrees: Degree[];
  rawDegrees: Degree[];
  loaded = false;

  loading = false;

  searchFormControl = new FormControl('');

  constructor(private authService: AuthService, private courseService: CourseService, private userService: UserService,
    private degreeService: DegreeService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loading = true;
    this.user = this.authService.getCurrentUser();
    this.degreeService.getDegrees().valueChanges().subscribe((degrees) => {
      if (!this.rawDegrees) this.rawDegrees = degrees;
      this.degrees = this.filterByName('', degrees);
    })

  }

  filterByName(event, degrees: Degree[]): Degree[] {
    return degrees.filter(degree => degree.name.toLowerCase().includes((this.searchFormControl.value as string).toLowerCase()))
  }

  filter() {
    let filtered1 = this.filterByName('', this.rawDegrees);
    this.degrees = filtered1;
  }


}
