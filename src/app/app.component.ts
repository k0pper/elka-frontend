import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { User, ROLES } from './model/user';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  user: User;
  sub: Subscription;
  roles = [];

  constructor(private sidenavService: SidenavService, private userService: UserService,
    private authService: AuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `brain`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/brain.svg")
    );
  }

  ngOnDestroy(): void {
    console.log("on destroy");
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit() {
    this.getRoles();
    this.user = this.authService.getCurrentUser();
  }

  signOut() {
    this.sidenav.close();
    this.authService.signOut();
  }

  getRoles() {
    const userId = this.authService.getCurrentUser().id;
    this.userService.getUserById(userId).valueChanges().subscribe((user: User) => {
      this.roles = user.roles;
    });
  }

}
