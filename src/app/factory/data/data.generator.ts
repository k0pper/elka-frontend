import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Course } from 'src/app/model/course';
import { User } from 'src/app/model/user';
import { ScheduledSemester } from 'src/app/model/scheduled.semester';

import * as courses from './courses.json';
import * as scheduledSemesters from './scheduled-semesters.json';
import * as degrees from './degrees.json'


@Injectable({providedIn: 'root'})
export class DataGenerator {
  private coursesPath = "/courses"
  private usersPath = "/users"
  private scheduledSemestersPath = "/scheduledSemesters"
  private degreesPath = "/degrees"

  coursesCollection: AngularFirestoreCollection<Course> = null;
  scheduledSemestersCollection: AngularFirestoreCollection<ScheduledSemester> = null;
  usersCollection: AngularFirestoreCollection<User> = null;
  degreesCollection: AngularFirestoreCollection<User> = null;

  constructor(private db: AngularFirestore) {
    this.coursesCollection = db.collection(this.coursesPath);
    this.usersCollection = db.collection(this.usersPath);
    this.degreesCollection = db.collection(this.degreesPath);
    this.scheduledSemestersCollection = db.collection(this.scheduledSemestersPath);
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

  generateScheduledSemesters() {
    this.scheduledSemestersCollection.get().subscribe((res) => {
      res.forEach((doc) => {
        doc.ref.delete();
      })
      for (let scheduledSemester of (scheduledSemesters as any).default) {
        this.scheduledSemestersCollection.add(scheduledSemester);
      }
    })
  }

  generateDegrees() {

    let allDegrees = (degrees as any).default

    this.degreesCollection.get().subscribe((res) => {
      res.forEach((doc) => {
        doc.ref.delete();
      })

      for (let degree of (degrees as any).default) {
        this.degreesCollection.add(degree);
      }
    })
  }

  deleteUser(user: User) {
    this.usersCollection.doc(user.id).delete()
  }
}
