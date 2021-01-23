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

// import { firestore } from 'firebase/firestore'
@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  
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
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
 async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  constructor(
    private auth : AngularFireAuth,
    private userSer: UserService,
    private afs: AngularFirestore,
    public modalController: ModalController
  ) {}

  ngOnInit(){
    this.getuserAuth();
    this.getUser()
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

 
  onSearchChange($event){}

  getuserAuth(){
    this.auth.currentUser.then(user =>  {
      this.userid = user.uid
      console.log(this.userid)
    } );
  }
 
   ngOnDestroy() {
    }




}
