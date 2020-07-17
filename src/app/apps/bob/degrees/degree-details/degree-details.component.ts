import { Component, OnInit, Input, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { Degree } from 'src/app/model/degree';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { DegreeService } from 'src/app/services/degree.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'degree-details',
  templateUrl: './degree-details.component.html',
  styleUrls: ['./degree-details.component.scss']
})
export class DegreeDetailsComponent implements OnInit, OnDestroy {
  degree: Degree;
  @Input() user: User;
  loading = false;

  private sub: any;

  constructor(private userService: UserService, private authService: AuthService, private degreeService: DegreeService, private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()

    console.log("oninit details")
    this.loading = true;
    this.sub = this.route.params.subscribe(params => {
      this.degreeService.getDegrees().valueChanges().subscribe((degrees: Degree[]) => {
        this.degree = degrees.find((deg: Degree) => deg.shortName == params['shortName'])
        this.loading = false;
      });
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AreYouSureDialog, {
      width: '400px',
      data: {degree: this.degree, user: this.user}
    });

    dialogRef.afterClosed().subscribe((result: Degree) => {
      console.log("emitting service event")
      this.degreeService.degreeChanged.emit(result);
    });
  }

}

@Component({
  selector: 'my-dialog',
  templateUrl: 'dialog.html',
})
export class AreYouSureDialog {

  constructor(public dialogRef: MatDialogRef<AreYouSureDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private userService: UserService, private matSnackbar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    console.log("updating plannedDegree")
    let user = this.authService.getCurrentUser();
    let newDegree: Degree = this.data.degree;
    user.plannedDegree = newDegree;
    this.userService.createUpdateUser(user);
    this.dialogRef.close(newDegree);
    this.openSnackBar();
  }

  openSnackBar() {
    let snackBarRef = this.matSnackbar.open('Studiengang geändert. Seite neu laden um die Änderungen anzuzeigen.', 'Neu laden', {
      duration: 4000
    });
    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    })
  }

}
