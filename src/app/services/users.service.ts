import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../model/user';

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

  createUser(user: User): void {
    console.log("creating user");
    console.log(user);

    this.userDocument = this.usersCollection.doc(user.id);
    console.log(this.usersPath);
    this.userDocument.set({...user});
  }

  getUsersList(): AngularFirestoreCollection<User> {
    return this.usersCollection;
  }

  getUserById(id: string): AngularFirestoreDocument<User> {
    console.log("getuserid", id)
    return this.usersCollection.doc(id);
  }
}
