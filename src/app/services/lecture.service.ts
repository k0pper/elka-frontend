import { Injectable } from '@angular/core';
import { RegularLecture } from '../model/lecture';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../model/course';

@Injectable({providedIn: 'root'})
export class LectureService {
  lectureCollection: AngularFirestoreCollection<RegularLecture> = null;
  lectureDocument: AngularFirestoreCollection<RegularLecture> = null;

  constructor(private db: AngularFirestore) {
    this.lectureCollection = db.collection('/lectures');
  }

  createRegularLecture(lecture: any) {
    this.lectureCollection.add(lecture);
  }

  getLectures() {
    return this.lectureCollection;
  }

}
