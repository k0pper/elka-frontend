import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, ROLES } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DataGenerator } from 'src/app/factory/data/data.generator';

@Component({
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss']
})

export class AdminComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService, private generator: DataGenerator) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  generateCourses() {
    this.generator.generateCourses();
  }

  deleteCurrentUser() {
    this.generator.deleteUser(this.user);
  }
}
