import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IonhelperService } from 'src/app/helper/ionhelper.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { Post } from 'src/app/db/model/blog';
import { UserService } from '../../../db/service/user.service';
import { AuthService } from 'src/app/db/service/auth.service';
import { LoadingController } from '@ionic/angular';


// export class Post {
//   postId: string;
//   content: string;
//   postImage: string;
//   author: string;
//   Title: string;
//   authorimage: string;
//   authorId: string;
//   views: number;

//   createdDate: any;
//   constructor() {
//   this.content = '';
//   }
//   }



@Component({
  selector: 'app-makepost',
  templateUrl: './makepost.page.html',
  styleUrls: ['./makepost.page.scss'],
})
export class MakepostPage implements OnInit {


  // user
  displayImage: string ;
  username: string ;
  userId: string;
  userEamil: string;
  login: boolean;
  // post
  postData = new Post();

  postContent: string;
  postImage: string = null;
  postViews: number;
  likes: any;
  loading: boolean;

  posts: Observable<Post[]>;
  postCollectionRef: AngularFirestoreCollection<Post[]>;

  today = new Date();

  uploadPercent: number ;
  downloadURL: Observable<string>;
  constructor(
    private storage: AngularFireStorage,
    // private afAuth: AngularFireAuth,
    private  db: AngularFirestore,
    private ion: IonhelperService,
    public userSer: UserService,
    public auth: AuthService,
    private loadingController: LoadingController
     ) {
       this.getCurrentUser();
     }

  OnInit(){ 
      }

  ngOnInit(){}

  getCurrentUser() {
    this.auth.getAuthState()(
      user => {
        if (user) {
          console.log('user information', user)
          this.userSer.retrieveUserDocument(user.uid).subscribe(
            userDoc => {
              if (userDoc) {
                this.displayImage = userDoc.userImage;
                this.username = userDoc.displayName;
                this.userEamil = userDoc.email;
                this.userId = userDoc.uid;
              }
            });
        } else {

        }
    });
  }

  saveBlogPost() {
    this.ion.ionLoading('please wait', 500),
    this.db.collection<Post>('post').add({
      content : this.postData.content,
      photo : this.postImage ,
      author: this.username,
      views: 0,
      authorId: this.userId,
      createdDate: formatDate(this.today, 'hh:mm:ss a', 'en-US', '+0530'),
      approved: false,
      authorimage: this.displayImage,
      likes: [],
      postId: ''
    }).then(data => {
      this.ion.ionLoading('your post was succesfull', 2000);
      console.log(data);
       this.db.doc('post/' + data.id).update({postId:data.id,});
      this.postData.content = '';
      this.postImage = '';
     } ).catch(error => {
        console.log('error',error);
        this.ion.ionLoading('there was an error with your request', 2000);
    });
    if (!this.login) {
      console.log('you are not log in please wait when you find the name of the name you the')
      this.ion.ionToast('you need to be logging', 1000, '');
    }
 }

uploadPostImage(event) {
  try {
    this.loading = true;
    this.presentLoading()
    const file = event.target.files[0];
    const path = `postImage/${file.name}`;
    if ( file.type.split('/')[0] !== 'image') {
      return alert('Only Image Files');
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      task.percentageChanges().subscribe(d =>  {
        console.log('Image uploaded!' + d);
        this.uploadPercent =  d;
        });
      console.log('Image uploaded!' + this.uploadPercent);
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => (this.postImage = url));
          this.loading = false;
          this.loadingController.dismiss()
        })
      )
      .subscribe();
    }
  } catch (error) {
    this.loadingController.dismiss()
      return this.ion.ionToast('there waa an error plase if you are not login please do', 2000, '');
  }
}

async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'please wait',
    spinner: 'bubbles'
  });
  await loading.present();
}
}
