import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../model/user';
import { Progress } from '../model/progress';
import { ScheduledSemesterFactory } from '../factory/scheduled.semester.factory';

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

  createUpdateUser(user: User): void {
    console.log("creating/updating user");
    console.log(user);
    this.userDocument = this.usersCollection.doc(user.id);
    this.userDocument.set(
      JSON.parse(JSON.stringify(user))
    )
    localStorage.setItem("user", JSON.stringify(user));
  }

  updateProgressAndSave(user: User, newProgress: Progress) {
    for (let p of user.progresses) {
      if (p.refDegreeShortName == newProgress.refDegreeShortName) {
        p = newProgress;
        this.userDocument = this.usersCollection.doc(user.id);
        this.userDocument.set(JSON.parse(JSON.stringify(user)))
        localStorage.setItem("user", JSON.stringify(user));
        return;
      }
    }
  }

  createEmptyProgressForDegree(user: User, degreeShortName: string) {
    // No progress found, add new one
    let newProgress: Progress = new Progress()
      .setRefDegreeShortName(degreeShortName)
      .setCurrentSemester(1)
      .setFinishedCourses([])
      .setScheduledSemesters(ScheduledSemesterFactory.getNEmptySemesters(4, 1));

    user.progresses.push(newProgress);
    this.userDocument = this.usersCollection.doc(user.id);
    this.userDocument.set(JSON.parse(JSON.stringify(user)));
    localStorage.setItem("user", JSON.stringify(user));
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
        return progress;
      }
    }
    this.createEmptyProgressForDegree(user, user.plannedDegree.shortName);
  }

  getFinishedEcts(user: User) {
    let validCourses = user.plannedDegree.validCourses;
    let finishedContentBlocks = user.finishedContentBlocks;

    let finishedEcts = 0;
    for (let validCourse of validCourses) {
      let intersection = validCourse.mandatoryContentBlocks.map(cb => cb.name).filter(cbName => finishedContentBlocks.map(fCb => fCb.name).includes(cbName));
      if (intersection.length == validCourse.mandatoryContentBlocks.length) finishedEcts += validCourse.ects;
    }
    return finishedEcts;
  }

  getRemainingEcts(user: User) {
    let ectsFinished = this.getFinishedEcts(user);
    return user.plannedDegree.ectsNeeded - ectsFinished;
  }

  getTempo(user: User) {
    let finishedEcts = this.getFinishedEcts(user);
    let currentProgress = this.getCurrentProgress(user);
    if (currentProgress.currentSemester == 1) {
      return finishedEcts;
    }
    return finishedEcts / (currentProgress.currentSemester - 1);
  }

  getNumberOfPlannedCourses(user: User) {
    let numOfPlannedCourses = 0;
    for (let semester of this.getCurrentProgress(user).scheduledSemesters) {
      for (let c of semester.scheduledCourses) {
        numOfPlannedCourses += 1;
      }
    }
    return numOfPlannedCourses;
  }

  getPlannedCourses(user: User) {

  }
}
