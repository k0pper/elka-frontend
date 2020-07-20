import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { User, ROLES } from './model/user';
import { Subscription } from 'rxjs';
import exportFromJSON from 'export-from-json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  user: User;
  sub: Subscription;

  constructor(private sidenavService: SidenavService, private userService: UserService,
    private authService: AuthService) {
  }

  ngOnDestroy(): void {
    console.log("on destroy");
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  downloadJson() {
    const data = this.user;
    const fileName = `Persoenliche-Daten-${this.user.firstName}-${this.user.lastName}`
    const exportType = 'json'
    exportFromJSON({ data, fileName, exportType })
  }

  signOut() {
    this.sidenav.close();
    this.authService.signOut();
  }

  isAdmin() {
    return this.user.roles.includes(ROLES.ADMIN);
  }

}
