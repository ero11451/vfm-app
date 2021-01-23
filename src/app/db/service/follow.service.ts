import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    public userservice: UserService,
  ) { }

  isFollowing(profileuid, currentuid) {
    return this.afs.collection<any>('/users/' + profileuid + '/Followers',
     ref => ref.where('uid', '==', currentuid)).valueChanges();
  }

  follow(profileuid, Otherusername, Otheruserimage) {
    this.auth.getCurrentUseData().subscribe(
      user => {
        if (user) {
          const currentuid = user.uid;
          const username = user.displayName;
          const userimage = user.userImage;
          let data = {
            uid: profileuid,
            userName: Otherusername,
            userImage: Otheruserimage
          };
          this.afs.collection<any>('/users/' + currentuid + '/Following').doc(profileuid).set(data);
          data = {
            uid: currentuid,
            userName: username,
            userImage: userimage
          };
          this.afs.collection<any>('/users/' + profileuid + '/Followers').doc(currentuid).set(data).then(
            () => {
              console.log('some one just followed you hope you happy about that');
            });
        }
      });
  }



  unfollow(profileuid) {
    this.auth.getAuthState()(
      user => {
        if (user) {
          const currentuid = user.uid;
          this.afs.collection<any>('/users/' + currentuid + '/Following').doc(profileuid).delete();
          this.afs.collection<any>('/users/' + profileuid + '/Followers').doc(currentuid).delete().then(
            () => {
              console.log('some one just unfollowed you please cheak your self');
              // this.auth.lostFollowPoint();
            });
        }
    });
  }

  getFollowing(uid) {
    return this.afs.collection<any>('/users/' + uid + '/Following').valueChanges();
  }



  getFollowers(uid) {
    return this.afs.collection<any>('/users/' + uid + '/Followers').valueChanges();
  }


}