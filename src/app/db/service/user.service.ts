import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    // public auth: AuthService,
    private afs: AngularFirestore,
  ) { }

  retrieveUserDocument(uid) {
    return this.afs.doc<any>('users/' + uid).valueChanges();
  }

  retrieveUserDocumentFromUsername(username) {
    return this.afs.collection('users', ref => ref.where('userName', '==', username)).valueChanges();
  }
  retrieveUserDocumentFromID(uid) {
    return this.afs.doc<any>('users/' + uid).valueChanges();
  }


  getOnlineUsers() {
    return this.afs.collection('users', ref => ref.where('onlineStatus', '==', true)).valueChanges();
  }
  getNormalUsers() {
    return this.afs.collection('users', ref => ref.orderBy('uid', 'desc')).valueChanges();
  }
}