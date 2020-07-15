import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Course } from '../model/course';

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
}
