import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, ROLES } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  templateUrl: 'bob.component.html',
  styleUrls: ['bob.component.scss']
})

export class BobComponent implements OnInit {
  user: User;
  downloadJsonHref;
  roles = [];

  notifications = [
    {
      by: 'Hans Jürgen',
      foreignCourseName: 'Grundlagen der Wirtschaftsinformatik',
      homeCourseName: 'Einführung in die Wirtschaftsinformatik'
    },
    {
      by: 'Tim Schneider',
      foreignCourseName: 'Höhere Mathematik 1',
      homeCourseName: 'Mathematik 1'
    },
    {
      by: 'Sandra Sauer',
      foreignCourseName: 'Sozialöknomie',
      homeCourseName: 'Volkswirtschaftslehre'
    },
    {
      by: 'Tom Hengst',
      foreignCourseName: 'Theoretische Informatik',
      homeCourseName: 'Theoretische Informatik'
    },
    {
      by: 'Philipp Nase',
      foreignCourseName: 'Algorithmen und Datenstrukturen',
      homeCourseName: 'Programmieren 2'
    }
  ];

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private sidenavService: SidenavService) { }

  ngOnInit() {
    this.getRoles();
    this.user = this.authService.getCurrentUser();
  }

  toggleSidenav() {
    this.sidenavService.open();
  }

  getRoles() {
    const userId = this.authService.getCurrentUser().id;
    this.userService.getUserById(userId).valueChanges().subscribe((user: User) => {
      this.roles = user.roles;
    });
  }

}
