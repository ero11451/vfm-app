import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IonhelperService } from '../../helper/ionhelper.service';
import { UserService } from './user.service';


interface User {
  uid: string;
  email: string;
  displayName?: string;
  walletBallance?: number;
  status: string;
  userImage: string;
  onlineStatus: boolean;
  bio: string;
  gender:string;
  location:string;
  branch:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData;
  public currentUser: firebase.default.User = null;

  public user: Observable<User[]>;
  public userCollection: AngularFirestoreCollection<User>;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private ion: IonhelperService,
    private afs: AngularFirestore,
    private userSer: UserService,
    public afAuth: AngularFireAuth,
    ) {
      this.ngFireAuth.currentUser.then(user => {
        if (user) {
          this.userData = user;
          this.currentUser = user;
          // return this.afStore.collection('users',).add(user);
        } else {
          this.currentUser = null;
          console.log('you no get any data with us for now when you register we do talk') }
         });
    }
  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

    // Register user with email/password
  RegisterUser(useremail, password, username , phoneNumber, userContry, image, branch, gender) {
      this.ion.ionLoading(`please wait`, 1000);
      return this.ngFireAuth.createUserWithEmailAndPassword(useremail, password)
      .then(user => {
        console.log(user.user.uid);
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.user.uid}`);
        const data = {
          uid: user.user.uid,
          email: useremail,
          displayName: username,
          userImage: image,
          walletBallance: 0,
          status: 'member',
          onlineStatus: true,
          phoneNumber,
          location: userContry ?? '',
          bio: '',
          branch: branch,
          gender:gender

        };
        return userRef.set (data, { merge: true})
        .then(FormData =>
          this.ion.ionLoading(`user created successfuly your user name ${FormData}`, 2000)
         )
         .catch(erro =>  {
              console.log(erro);
              this.ion.ionToast('there was an error with your request', 1000, 'danger')
           } );
       })
     }

  getUserdata(userid){
       this.ngFireAuth.currentUser.then(user => this.userCollection.get());
       return this.userCollection.doc<User>(userid).valueChanges().pipe(
        take(1),
        map(user => {  user = userid; return user; })
      );
     }

    getAuthState() {
      return this.afAuth.onAuthStateChanged;
    }
    getCurrentUseData(){
       return this.userSer.retrieveUserDocumentFromID(this.userData.uid);
    }

    // Sign-out
    SignOut() {
        this.ngFireAuth.signOut().then(() => {
        this.router.navigate(['/login']);
      });
    }

  userObs: Observable<any>;

  updateUserData(user) {
    // check if user already exists
    this.userCollection = this.afs.collection('users', ref => ref.where('uid', '==', user.uid));
    this.userObs = this.userCollection.valueChanges();
    this.userObs.forEach( userobj => {
      console.log('Existing User logged in- ', userobj[0].userName);
    })
    .then(
      (success) => {
        console.log('update was successful', success)
      })
    .catch (
      (err) => {
        // setup user data in firestore on login
          console.log('New User login.\nSetting up user in database.');
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
          const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            status: '',
            userImage: user.displayimage,
            onlineStatus: user.onlineStatus,
            bio: user.bio,
            location: user.location,
            gender: user.gender,
            branch: user.dranch
          };

          return userRef.set(data, { merge: true });
        });
  }
  
fundWallet(amount){
  this.afAuth.currentUser.then(userData => {
      const user : AngularFirestoreDocument<any> = this.afs.doc(`users/${userData.uid}`);
    const increment = firebase.default.firestore.FieldValue.increment(amount);
    console.log('this is form', this.currentUser)
    return user.update({ walletBallance: increment}) })
  // .catch(erro => { console.log('there was an error with you ')})
 
  }

  defundWallet(amount){
    const user : AngularFirestoreDocument<any> = this.afs.doc(`users/${this.currentUser.uid}`);
    const decrement = firebase.default.firestore.FieldValue.increment(-amount);
    return user.update({
        walletBallance: decrement
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
}