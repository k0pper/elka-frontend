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
  user: User;
  apps = [
    {
      name: 'ELKA ONE TODO',
      descr: 'Behalte deine Fristen und Termine im Überblick',
      color: 'green',
      image: 'assets/images/onetodo.png',
      class: "onetodo",
      link: "one-todo"
    },
    {
      name: 'BOB STUDY BUILDER',
      descr: 'Plane dir flexibel dein Studium und behalte deinen Fortschritt im Blick',
      color: 'green',
      image: 'assets/images/study-builder.png',
      class: "bob",
      link: "bob"
    },
    {
      name: 'ELKA ATLANTIS',
      descr: 'Schaue dir aufgezeichnete Vorlesung nochmal an und verwalte deine Materialien',
      color: 'green',
      image: 'assets/images/atlantis.png',
      class: "atlantis"
    },
    {
      name: 'ELKA XAMS',
      descr: 'Verliere nie wieder deine Prüfungstermine und Abgaben aus den Augen',
      color: 'green',
      image: 'assets/images/xams.png',
      class: "xams"
    }
  ];

  constructor(private authservice: AuthService, private router: Router) {

  }
   ngOnInit() {
    console.log("on init chooser")
    console.log(this.authservice.user)
    this.user = this.authservice.getCurrentUser();
  }

  signOut() {
    this.authservice.signOut();
  }

  logLocal() {
    console.log(JSON.parse(localStorage.getItem('user')))
  }

  routeTo(link) {
    console.log(link)
    this.router.navigate([link])
  }
}
