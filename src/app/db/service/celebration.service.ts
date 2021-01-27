
import { Injectable } from '@angular/core';
import { Post } from '../model/blog';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CelebrationService {
  constructor(private db: AngularFirestore) { }

  createPost(post: Post) {
    const postData = JSON.parse(JSON.stringify(post));
    return this.db.collection('GiftCards').add(postData);
    }

  getPostbyId(id: string): Observable<Post> {
    const blogDetails = this.db.doc<Post>('GiftCards/' + id).valueChanges();
    return blogDetails;
      }

  deletePost(postId: string) {
    return this.db.doc('giftCard/' + postId) .delete();
    }

  updatePost(postId: string, post: Post) {
   const putData = JSON.parse(JSON.stringify(post));
   return this.db.doc('giftCard/' + postId).update(putData);
  }

  getAllPosts(): Observable<Post[]> {
      const comments = this.db.collection<Post>('GiftCards',
      ref => ref.orderBy('createdDate',
     'desc')).snapshotChanges().pipe(
      map(actions => {
      return actions.map(
      c => ({
      commentId: c.payload.doc.data, ...c.payload.doc.data() 
      }));
      }));
      return comments;
      }

    getAllMyPosts(): Observable<Post[]> {
      const blogs = this.db.collection<Post>('GiftCards', ref =>
     ref.orderBy('createdDate', 'desc'))
      .snapshotChanges().pipe(
      map(actions => {
      return actions.map(
      c => ({
      postId: c.payload.doc, ...c.payload.doc.data() 
      }));
      }));
      return blogs;
      }

      getApprovedPost(): Observable<Post[]> {
        const comments = this.db.collection<Post>('GiftCards',
        ref => ref.where('approved', '==', true).orderBy('createdDate',
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


    getAllCommentsForBlog(blogId: string): Observable<Post[]> {
          const comments = this.db.collection<Post>('GiftCards',
          ref => ref.where('authorId', '==', blogId).orderBy('createdDate',
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
