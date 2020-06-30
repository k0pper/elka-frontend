import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'bob.component.html',
  styleUrls: ['bob.component.scss']
})

export class BobComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  signOut(redirect) {
    this.authService.signOut(redirect);
  }

  routeTo(route) {

  }
}
