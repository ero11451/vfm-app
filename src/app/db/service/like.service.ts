import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getLikes(jobid) {
    return this.afs.collection('blog/' + jobid + '/savedjobs').valueChanges();
  }

  getUserLikes(uid) {
    return this.afs.collection('users/' + uid + '/likes', ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  addLike(postid, uid) {
    this.afs.doc('post/' + postid + '/likes/' + uid);
  }

  disLike(postid, uid) {
    this.afs.doc('post/' + postid + '/savedjobs/' + uid).delete()
    // .then(() => console.log('job ', jobid, ' remobed by user ', uid));
  }
}
