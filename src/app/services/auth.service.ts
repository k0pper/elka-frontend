import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './users.service';
import { User, ROLES } from '../model/user';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user: User;

  ngOnInit(): any {}

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private router: Router) {
    afAuth.authState.subscribe(user => {
      this.userService.getUserById(user.uid).valueChanges().subscribe((userObject: User) => {
        this.user = userObject;
      })
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.clearLocalStorage();
      this.router.navigateByUrl('/auth');
    })
  }

  setLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  clearLocalStorage() {
    localStorage.setItem('user', null);
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  hasRole(role: ROLES) {
    return this.getCurrentUser().roles.includes(ROLES.ADMIN);
  }

}
