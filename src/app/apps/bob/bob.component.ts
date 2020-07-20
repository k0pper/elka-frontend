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
    this.user = this.authService.getCurrentUser();
  }

  isAdmin() {
    return this.user.roles.includes(ROLES.ADMIN);
  }

  toggleSidenav() {
    this.sidenavService.open();
  }
}
