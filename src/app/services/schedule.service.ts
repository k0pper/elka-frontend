import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from './users.service';

@Injectable({providedIn: 'root'})
export class ScheduleService {
  private usersPath = "/courses";
  usersCollection: AngularFirestoreCollection<User> = null;
  userDocument: AngularFirestoreDocument<User> = null;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.usersCollection = db.collection(this.usersPath);
  }
}
