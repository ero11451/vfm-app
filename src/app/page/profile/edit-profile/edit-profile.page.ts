import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/db/model/user';
import { AuthService } from 'src/app/db/service/auth.service';
import { UserService } from 'src/app/db/service/user.service';
import { IonhelperService } from '../../../helper/ionhelper.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
 // user
 displayImage: string ;
 username: string ;
 userId: string;
 userEamil: string;
 login: boolean;
 loading: boolean;
 password

  bio: string;
  userData = new User();
  uploadPercent: number ;
  downloadURL: Observable<string>;

  constructor(
    private ion: IonhelperService,
    public fb: FormBuilder,
    private firestore: AngularFirestore,
    private nav: Router,
    public auth: AuthService,
    public userSer: UserService,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
     this.getCurrentUser()
  }

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
                this.bio = userDoc.bio;
              }
            });
        } else {

        }
    });
  }
  saveBlogPost() {
    console.log(this.userData)
    this.ion.ionLoading('please wait', 500),
    firebase.default.auth().currentUser.updateEmail(this.userData.email)
      .then(() => { this.ion.ionToast('you update was successful', 2000, 'primary') })
      .catch(function(error) { });
    firebase.default.auth().currentUser.updatePassword(this.password)
    // firebase.auth().currentUser.updatePhoneNumber(this.userData.phoneNumber)
    this.firestore.collection('users').doc(this.userId).update({
      bio: this.userData.bio || this.bio,
      displayName: this.userData.displayName || this.username,
      onlineStatus: true,
      phoneNumber: this.userData.phoneNumber ,
      gender: this.userData.gender
    }).then(data => {
      this.nav.navigate(['tabs/profile', this.userId])
      this.ion.ionLoading('your update was succesfull', 2000);
      console.log(data);
     } ).catch(error => {
        console.log('error',error);
        this.ion.ionLoading('there was an error with your request', 2000);
    });
 }


  // checkUsername(q) {
  //   this.afs.collection('users', ref => ref.where('userName', '==', q)).valueChanges().subscribe(user => {
  //     const searchuser: any = user[0];
  //     if (user[0] && this.currentusername !== searchuser.userName) {
  //         this.isTaken = true;
  //     } else {
  //       this.isTaken = false;
  //     }
  //   });
  // }




}
