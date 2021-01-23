import { IonhelperService } from './../../../helper/ionhelper.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, MenuController, ModalController, PopoverController } from '@ionic/angular';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { interval, Subject } from 'rxjs';
import { MenuPage } from 'src/app/container/menu/menu.page';
import { SettingPage } from 'src/app/container/setting/setting.page';
import { FollowService } from '../../../db/service/follow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../db/service/auth.service';
import { UserService } from '../../../db/service/user.service';
import { AllpostService } from '../../../db/service/post.service';
import { size } from 'lodash';
import { UploadfileComponent } from '../../../container/uploadfile/uploadfile.component';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { LogoutPage } from 'src/app/container/logout/logout.page';
import { MypostPage } from '../mypost/mypost.page';
import { takeUntil } from 'rxjs/operators';
import { UserDetailComponent } from '../user-detail/user-detail.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private follow: FollowService,
    private userSer: UserService,
    private menuController: MenuController,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private postSer: AllpostService,
    private ion: IonhelperService,
    private modalController: ModalController,
    private postSrv: AllpostService,
  ) {
    this.checkCurrentUser();
   }
  posts: any;
  postNumber:number;
  userImage: string;
  userDisplayName: string;
  status: string;
  bio: string;
  userEmail: string;
  isCurrentUser: boolean;
  userid: string;
  following?: any;
  followers?: any;
  userFollowers: any;
  userFollowing: any;
  isFollowing: boolean;
  currentuid;
  isLoggedIn: boolean;
  walletBallance:number

  private unsubscribe$ = new Subject<void>();

  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  } 
  



  ngOnInit() {
    this.userid = this.activatedRoute.snapshot.params.userid;
    console.log('user id ', this.userid);
    // console.log('followes', this.followers , 'following', this.following)
    this.getUserData();
    this.getpost();
    this.getFollowData();
  }

  getFollowData() {
    this.follow.getFollowers(this.userid).subscribe(
      followers => {
        this.followers = followers.length;
        this.userFollowers = followers;
        console.log('this are my followers' ,followers);
      });
    this.follow.getFollowing(this.userid).subscribe(
      following => {
        this.following = following.length;
        console.log(following);
        this.userFollowing = following;
      });
  }

  followUser() {
    if (this.isFollowing) {
      this.isFollowing = false;
      this.follow.unfollow(this.userid);
    } else {
      this.isFollowing = true;
      this.follow.follow(this.userid, this.userDisplayName,this.userImage);
    }
  }
  menu(){
    this.menuController.open();
  }

getUserData(){
  this.userSer.retrieveUserDocumentFromID(this.userid).subscribe(user => {
     this.userDisplayName = user.displayName;
     this.bio = user.bio;
     this.status = user.status;
     this. userEmail = user.email;
     this.userImage = user.userImage;
     this.followers = user.Followers;
     this.following = user.Followings;
     this.walletBallance = user.walletBallance;
  });
}
getpost(){
    const userid = this.activatedRoute.snapshot.params.userid;
    this.postSrv.getAllCommentsForBlog(userid).
    pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
    this.posts = result;
    console.log('this are all the post', result);
    });
}

getDetele(postid){
  this.postSer.deletePost(postid);
}

checkCurrentUser() {
    this.auth.getAuthState()(
      user => {
        if (user) {
          if (this.userid) {
            this.isLoggedIn = true;
            this.currentuid = user.uid;
            console.log('current user id', this.currentuid);
            if (this.userid === user.uid) {
              this.isCurrentUser = true;
            }
            this.follow.isFollowing(this.userid, this.currentuid).subscribe(
              followinguser => {
                if (followinguser[0]) {
                  this.isFollowing = true;
                }
            });
          }
        } else {
          this.isLoggedIn = false;
        }
    });
  }
 async uploadFile(image){
    if (this.checkCurrentUser) {
    this.ion.presentModal(UploadfileComponent, this.currentuid, 'bottom-model'); 
    }
    else {
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
  }

  async myPost(){
    this.ion.presentModal(MypostPage, this.posts, ''); 
    console.log(this.posts)
  }

  async myDetail(){
    const userid = this.activatedRoute.snapshot.params.userid;
    this.ion.presentModal(UserDetailComponent, userid, 'bottom-model-setting'); 
    console.log(this.posts)
  }



  async logOut(){
    await this.menuController.close()
    this.ion.presentModal(LogoutPage, '', 'bottom-model')
  }
}