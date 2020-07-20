import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Degree } from '../model/degree';
import { User } from '../model/user';
import { Course } from '../model/course';
import { CourseService } from './course.service';
import { UserService } from './users.service';

@Injectable({providedIn: 'root'})
export class DegreeService {
  degreeCollection: AngularFirestoreCollection<Degree> = null;
  degreeDocument: AngularFirestoreDocument<Degree> = null;

  public degreeChanged = new EventEmitter<any>();

  constructor(db: AngularFirestore, private userService: UserService) {
    this.degreeCollection = db.collection('/degrees');
  }

  createDegree(degree: any) {
    console.log("degree courses")
    console.log(degree.courses)
    this.degreeDocument = this.degreeCollection.doc(degree.shortName);
    this.degreeDocument.set(JSON.parse( JSON.stringify(degree)))
  }

  getDegrees() {
    return this.degreeCollection;
  }

  getLostEcts(user: User, newDegree: Degree) {
    return this.userService.getFinishedEctsForDegree(user, user.plannedDegree) -
      this.userService.getFinishedEctsForDegree(user, newDegree);
  }
}
