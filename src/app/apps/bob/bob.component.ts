import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, ROLES } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: 'bob.component.html',
  styleUrls: ['bob.component.scss']
})

export class BobComponent implements OnInit {
  user: User;
  downloadJsonHref;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  signOut(redirect) {
    this.authService.signOut(redirect);
  }

  routeTo(route) {

  }

  isAdmin() {
    return this.user.roles.includes(ROLES.ADMIN);
  }

  downloadJson(){
    let json = null;
    this.userService.getUserById(this.user.id).valueChanges()
      .subscribe(data => {
        json = JSON.stringify(data);
        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(json));
        element.setAttribute('download', "userdata.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click(); // simulate click
        document.body.removeChild(element);
      });
}
}
