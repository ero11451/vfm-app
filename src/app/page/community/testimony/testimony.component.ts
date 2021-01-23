import { Component, OnInit, ViewChild } from '@angular/core';

import { IonSlides, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../../db/service/user.service';
import { AllpostService } from '../../../db/service/post.service';
import { Post } from 'src/app/db/model/blog';
import { LikesService } from '../../../db/service/like.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/db/service/auth.service';
import * as firestore from 'firebase';

import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss'],
})
export class TestimonyComponent implements OnInit {

	postReference: AngularFirestoreDocument
  postID: string;
  onlineUsers;
  allPost;
  userid;
  currentUserName;
  currentUserImage;
  private unsubscribe$ = new Subject<void>();
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  constructor(
    private users: UserService,
    private postSrv: AllpostService,
    private auth : AngularFireAuth,
    private postService: LikesService,
    private userSer: UserService,
    private afs: AngularFirestore,
    public modalController: ModalController
  ) {}

  ngOnInit(){
    this.getuserAuth();
    this.getAllPost();
    this.getUser()
  }
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }

  getUser(){
    this.auth.currentUser.then(user => {
        this.userSer.retrieveUserDocumentFromID(user.uid).subscribe(
        d => {
        if (d) {
          console.log(d);
          this.currentUserImage  = d.userImage || '';
          this.currentUserName = d.displayName;
          // this.userId = d.uid;
        }else{
          console.log('there was an error')
          // this.nodata = true;
        }
      }
      )
    });
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  onSearchChange($event){}

 
  getAllPost() {
    this.postSrv.getAllPosts().
    pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
    this.allPost = result;
    
    console.log('this are all the post', result);
    });
  }
  getuserAuth(){
    this.auth.currentUser.then(user =>  {
      this.userid = user.uid
      console.log(this.userid)
    } );
  }
  likePost(post: any) {
    console.log('this is the post i liked',);

		 this.afs.doc(`post/${post.postId}`).update({
      likes: firestore.default.firestore.FieldValue.arrayUnion(this.userid)
    })
  }
 
  dislike(post){
		this.postReference = this.afs.doc(`post/${post.postId}`)
		this.postReference.update({
      likes: firestore.default.firestore.FieldValue.arrayRemove(this.userid)
    })
  }
   // tslint:disable-next-line: use-lifecycle-interface
   ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    }


async  openImage(image){
      const modal = await this.modalController.create({
        component: ViewerModalComponent,
        componentProps: {
          src: image
        },
        cssClass: 'ion-img-viewer',
        keyboardClose: true,
        showBackdrop: true
      });
   
      return await modal.present();
    }

    doRefresh(event) {
      console.log('Begin async operation');
     this.getUser()
     this.getAllPost()
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
      

}
