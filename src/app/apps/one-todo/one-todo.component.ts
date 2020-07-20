import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'one-todo',
  templateUrl: 'one-todo.component.html',
  styleUrls: ['one-todo.component.scss']
})

export class OneTodoComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private sidenav: SidenavService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
