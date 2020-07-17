import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Degree } from '../model/degree';

@Injectable({providedIn: 'root'})
export class DegreeService {
  degreeCollection: AngularFirestoreCollection<Degree> = null;
  degreeDocument: AngularFirestoreDocument<Degree> = null;

  public degreeChanged = new EventEmitter<any>();

  constructor(db: AngularFirestore) {
    this.degreeCollection = db.collection('/degrees');
  }

  createDegree(degree: any) {
    console.log("degree courses")
    console.log(degree.courses)
    this.degreeDocument = this.degreeCollection.doc(degree.shortName);
    this.degreeDocument.set(JSON.parse( JSON.stringify(degree)))
  }

  getDegreeByShortName(shortName: string): AngularFirestoreDocument<Degree> {
    return this.degreeCollection.doc(shortName);
  }

  getDegrees() {
    return this.degreeCollection;
  }
}
