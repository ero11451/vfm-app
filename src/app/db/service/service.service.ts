import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceComment } from '../model/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private db: AngularFirestore) { }

  makeComment(post: ServiceComment) {
    const postData = JSON.parse(JSON.stringify(post));
    return this.db.collection('serviceComment').add(postData);
    }

  getCommentId(id: string): Observable<ServiceComment> {
    const blogDetails = this.db.doc<ServiceComment>('serviceComment').valueChanges();
    return blogDetails;
      }

  deleteComment(commentId: string) {
    return this.db.doc('serviceComment/' + commentId) .delete();
    }

   updateComment(postId: string, post: ServiceComment) {
   const putData = JSON.parse(JSON.stringify(post));
   return this.db.doc('serviceComment/' + postId).update(putData);
  }


    getAllComment(): Observable<ServiceComment[]> {
      const comments = this.db.collection<ServiceComment>('serviceComment',
      ref => ref.orderBy('createdDate',
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


   getAllCommentsForService(serviceId: string): Observable<ServiceComment[]> {
     const comments = this.db.collection<ServiceComment>('seriveComment',
     ref => ref.where('serviceId', '==', serviceId).orderBy('createdDate',
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
