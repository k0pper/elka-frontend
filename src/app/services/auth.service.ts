import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './users.service';
import { User, ROLES } from '../model/user';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  user: firebase.User;

  ngOnInit(): any {}

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private router: Router) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(redirect) {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.clearLocalStorage();
      this.router.navigateByUrl('/auth');
    })
  }

  setLocalStorage (authState) {
    if (authState) {
      console.log("Put user into local storage")
      let userModel: User;
      this.userService.getUserById(authState.user.uid).valueChanges().subscribe((snapshot: any) => {
         userModel = new User(snapshot.id)
          .setEmail(snapshot.email)
          .setFirstName(snapshot.firstName)
          .setLastName(snapshot.lastName)
          .setRoles(snapshot.roles)
          .setAddress(snapshot.address)
          .setPlannedDegree(snapshot.plannedDegree);

        localStorage.setItem('user', JSON.stringify(userModel));
      });
    }
  }

  clearLocalStorage() {
    localStorage.setItem('user', null);
  }

  getCurrentUser(): User {
      return JSON.parse(localStorage.getItem('user'));
  }
}
