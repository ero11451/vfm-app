import { Injectable } from '@angular/core';
import { Post } from '../model/blog';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})


export class NotesService {

  constructor(
    public ngFireAuth: AngularFireAuth,
    private db: AngularFirestore) { }

  createNote(post: Post) {
    const postData = JSON.parse(JSON.stringify(post));
    return this.db.collection('notes').add(postData);
    }

  getNotebyId(id: string): Observable<Post> {
    const blogDetails = this.db.doc<Post>('notes/' + id).valueChanges();
    return blogDetails;
      }

  deleteNote(postId: string) {
    return this.db.doc('notes/' + postId) .delete();
    }

  updateNote(postId: string, post: Post) {
   const putData = JSON.parse(JSON.stringify(post));
   return this.db.doc('notes/' + postId).update(putData);
  }
  

   getMyNotes(userid) {
    const comments = this.db.collection<any>('notes',
    ref => ref.where('userid', '==', userid).orderBy('createdDate',
   'desc')).snapshotChanges().pipe(
    map(actions => {
    return actions.map(
    c => ({
    commentId: c.payload.doc.data,
    ...c.payload.doc.data()
    }));
    }));
    return comments;
    
        }


   
}