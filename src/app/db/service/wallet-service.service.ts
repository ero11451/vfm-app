import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { IonhelperService } from 'src/app/helper/ionhelper.service';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WalletServiceService {

  public userCollection: AngularFirestoreCollection;
  walletBallance 
  constructor( 
    public afStore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public ngFireAuth: AngularFireAuth,
    private ion : IonhelperService,
    private router: Router
  ) { 
    this.getWalletballance()

  }

defundWallet(amount){

       this.afAuth.currentUser.then(userData => {
 
       const user : AngularFirestoreDocument<any> = this.afStore.doc(`users/${userData.uid}`);

       console.log('this will get the user object ', user.valueChanges().subscribe(user => user) )
       const  decrement = firebase.default.firestore.FieldValue.increment(-amount);
      return user.update({ walletBallance: decrement }).then(res => {
          this.ion.ionToast('your transaction was successful',2000 , 'primary')
          this.router.navigate(['tabs/wallet'])
      }).catch(error => {
        this.ion.ionToast('your transaction was not successful',2000 , 'primary')
      })
     })     
    }
  
 

    fundWallet(amount){
      this.afAuth.currentUser.then(userData => {
          const user : AngularFirestoreDocument<any> = this.afStore.doc(`users/${userData.uid}`);
          const increment = firebase.default.firestore.FieldValue.increment(amount);
          return user.update({   walletBallance: increment })
        })
      }

    
      getWalletballance(){
        this.afAuth.currentUser.then(userData => {
          console.log('this is a function form the othere side', userData)
        })

      }
}
