import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from './users.service';
import { ScheduledSemester } from '../model/scheduled.semester';

@Injectable({providedIn: 'root'})
export class ScheduleService {
  private usersPath = "/courses";
  usersCollection: AngularFirestoreCollection<User> = null;
  userDocument: AngularFirestoreDocument<User> = null;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.usersCollection = db.collection(this.usersPath);
  }

  // addEmptyScheduledSemester(user: User, startIndex: number, n: number) {
  //   let scheduledSemesters = this.userService.getCurrentProgress(user).scheduledSemesters;
  //   for (let i = 0; i<n; ++i) {
  //     scheduledSemesters.push(new ScheduledSemester().setIndex(startIndex).setScheduledCourses([]));
  //   }
  // }
}
