import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';

@Component({
  templateUrl: './chooser.component.html',
  styleUrls: ['./chooser.component.scss']
})
export class ChooserComponent implements OnInit {
  user: firebase.User;

  constructor(private authservice: AuthService, private router: Router) {

  }
   ngOnInit() {
     console.log("on init chooser")
    console.log(this.authservice.user)
    this.user = this.authservice.getCurrentUser();
  }

  signOut() {
    this.authservice.signOut('auth');
  }

  logLocal() {
    console.log(JSON.parse(localStorage.getItem('user')))
  }
}
