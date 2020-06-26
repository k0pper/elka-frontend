import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe((auth => {
      this.authState = auth;
    }))
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  loginWithEmail(email: string, password: string): any {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        return this.authState
      })
      .catch(error => {
        console.log(error)
        throw error
        return this.authState
      });
  }

  singout(): void {
    this.auth.signOut();
    this.router.navigate(['/auth']);
  }


}
