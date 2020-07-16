import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { User, ROLES } from 'src/app/model/user';
import { auth } from 'firebase';
import { Address } from 'src/app/model/address';
import { DegreeService } from 'src/app/services/degree.service';
import { Degree } from 'src/app/model/degree';
import { DegreeFactory } from 'src/app/factory/degree.factory';
import { AddressFactory } from 'src/app/factory/address.factory';
import { ProgressFactory } from 'src/app/factory/progress.factory';
import { ContentBlockFactory } from 'src/app/factory/contentblock.factory';
import { ContentBlock } from 'src/app/model/contentblock';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authservice: AuthService, private userService: UserService,
    private router: Router, private degreeService: DegreeService) { }

  hide = true;
  error = null;
  loading = false;
  matcher = new MyErrorStateMatcher();

  usernameFormControl = new FormControl('admin@test.de', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('123456', [
    Validators.required,
  ]);

  ngOnInit(): void {

  }

  signIn() {
    let username = this.usernameFormControl.value;
    let password = this.passwordFormControl.value;
    this.loading = true;
    this.authservice.signIn(username, password)
      .then((authState: auth.UserCredential) => {
        this.handleSuccessfulLogin(authState);
        this.router.navigateByUrl('/chooser');
      }).catch(error => {
        this.handleFailedLogin(error);
      })
  }

  hasError() {
    let hasError =
      (this.usernameFormControl.hasError('required') ||
        this.usernameFormControl.hasError('email') ||
        this.passwordFormControl.hasError('required'))
    return hasError;
  }

  handleSuccessfulLogin(authState: auth.UserCredential) {
    this.userService.getUserById(authState.user.uid).valueChanges().subscribe((user: User) => {
      if (user) {
        console.log("user exists")
        console.log(user)
        this.authservice.setLocalStorage(user);
      } else {
        console.log("user doesnt exist. creating...")
        let user = new User(authState.user.uid)
          .setEmail(authState.user.email)
          .setFirstName("Max")
          .setLastName("Mustermann")
          .setRoles([ROLES.STUDENT, ROLES.ADMINISTRATION, ROLES.ADMIN])
          .setAddress(AddressFactory.getAddress())
          .setPlannedDegree(DegreeFactory.getRandomDegree("IWI"))
          .setProgresses([ProgressFactory.getProgress()])
          .setFinishedContentBlocks(ContentBlockFactory.getNRandomContentBlocks(6));
        this.userService.createUpdateUser(user);
        this.authservice.setLocalStorage(user);

      }
      this.loading = false;
    });
  }

  handleFailedLogin(authState: auth.UserCredential | any) {
    this.loading = false;
    this.error = "Die Kombination aus IZ-Account und Passwort wurde nicht gefunden"
    this.authservice.clearLocalStorage();
  }

}
