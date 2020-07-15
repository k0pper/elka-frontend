import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../model/user';
import { Progress } from '../model/progress';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersPath = '/users';

  usersCollection: AngularFirestoreCollection<User> = null;
  userDocument: AngularFirestoreDocument<User> = null;

  constructor(private db: AngularFirestore) {
    this.usersCollection = db.collection(this.usersPath);
  }

  createUser(user: any): void {
    console.log("creating user");
    console.log(user);
    this.userDocument = this.usersCollection.doc(user.id);
    this.userDocument.set(
      JSON.parse(JSON.stringify(user))
    )
  }

  getUsersList(): AngularFirestoreCollection<User> {
    return this.usersCollection;
  }

  getUserById(id: string): AngularFirestoreDocument<User> {
    console.log("getuserid", id)
    return this.usersCollection.doc(id);
  }

  getCurrentProgress(user: User): Progress {
    let progress: Progress;
    for (let p of user.progresses) {
      if (p.refDegreeShortName == user.plannedDegree.shortName) {
        progress = p;
      }
    }
    return progress;
  }

  getFinishedEcts(user: User) {
    let sum = 0;
    for (let course of this.getCurrentProgress(user).finishedCourses) {
      sum += course.ects;
    }
    return sum;
  }

  getRemainingEcts(user: User) {
    let ectsFinished = this.getFinishedEcts(user);
    return user.plannedDegree.ectsNeeded - ectsFinished;
  }

  getPlannedCourses(user: User) {
    
  }
}
