import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comments } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    ) { }

  saveComment(comment, postid, authorName, authorImage, createdData) {
  this.db.collection<Comments>('comment').add({
    // commentId: '',
    blogId: postid,
    authorName,
    authorImage,
    // commentedBy: string;
    content: comment,
    commentDate: createdData,

  })
  }
  getAllCommentsForBlog(blogId: string): Observable<Comments[]> {
  const comments = this.db.collection<Comments>('comment',
  ref => ref.where('postId', '==', blogId).orderBy('commentDate',
 'desc')).snapshotChanges().pipe(
  map(actions => {
  return actions.map(
  c => ({
  commentId: c.payload.doc, ...c.payload.doc.data() 
  }));
  }));
  return comments;
  }

  deleteAllCommentForBlog(blogId: string) {
  const commentsToDelete = this.db.collection('comments', ref =>
  ref.where('postId', '==', blogId)).snapshotChanges();
  commentsToDelete.forEach(
  commentList => {
  commentList.forEach(comment => {
  this.db.doc('comments/' + comment.payload.doc.data).delete();
  });
  }
  );
  }
  deleteSingleComment(commentId: string) {
  return this.db.doc('comments/' + commentId).delete();
  }
}
