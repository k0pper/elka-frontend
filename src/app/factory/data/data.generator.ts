import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Course } from 'src/app/model/course';
import * as courses from './courses.json';
import { User } from 'src/app/model/user';

@Injectable({providedIn: 'root'})
export class DataGenerator {
  private coursesPath = "/courses"
  private usersPath = "/users"

  coursesCollection: AngularFirestoreCollection<Course> = null;
  usersCollection: AngularFirestoreCollection<User> = null;

  constructor(private db: AngularFirestore) {
    this.coursesCollection = db.collection(this.coursesPath);
    this.usersCollection = db.collection(this.usersPath);
  }

  generateCourses() {
    this.coursesCollection.get().subscribe((res) => {
      res.forEach((doc) => {
        doc.ref.delete();
      })
      for (let course of (courses as any).default) {
        this.coursesCollection.add(course);
      }
    })
  }

  deleteUser(user: User) {
    this.usersCollection.doc(user.id).delete()
  }
}
