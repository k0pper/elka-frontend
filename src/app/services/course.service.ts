import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Course } from '../model/course';
import { User } from '../model/user';

@Injectable({providedIn: 'root'})
export class CourseService {
  private coursesPath = "/courses";
  courseCollection: AngularFirestoreCollection<Course> = null;

  constructor(private db: AngularFirestore) {
    this.courseCollection = db.collection(this.coursesPath);
  }

  getCourses(): AngularFirestoreCollection<Course> {
    return this.courseCollection;
  }

  getDoneContentBlocksPercentage(user: User, course: Course) {
    let mandatory = course.mandatoryContentBlocks;
    let finished = user.finishedContentBlocks;
    let n = 0;
    for (let finishedBlock of finished) {
      if ( mandatory.map(m => m.name).includes(finishedBlock.name) ) n +=1;
    }
    return Math.floor((n / mandatory.length) * 100)
  }
}
