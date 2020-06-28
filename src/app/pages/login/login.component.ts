import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { User, ROLES } from 'src/app/model/user';
import { auth } from 'firebase';

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
    private router: Router) { }

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
    this.userService.getUserById(authState.user.uid).valueChanges().subscribe((snapshot) => {
      if (snapshot) {
        console.log("user exists")
        console.log(snapshot)
      } else {
        console.log("user doesnt exist. creating...")
        let user = new User(authState.user.uid, authState.user.email, [ROLES.STUDENT, ROLES.ADMINISTRATION]);
        this.userService.createUser(user);
      }
      this.loading = false;
      this.router.navigateByUrl('/chooser')
      this.authservice.setLocalStorage(authState);

    });
  }

  handleFailedLogin(authState: auth.UserCredential | any) {
    this.loading = false;
    this.error = "Die Kombination aus IZ-Account und Passwort wurde nicht gefunden"
    this.authservice.clearLocalStorage();
  }

}
