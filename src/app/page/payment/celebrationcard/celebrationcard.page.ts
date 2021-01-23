import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/db/service/auth.service';
import { UserService } from 'src/app/db/service/user.service';
import { WalletServiceService } from 'src/app/db/service/wallet-service.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
class Post{
   message: string;
   receiverName:string;
   SenderName: string;
   userPhoto :string;
   authorId:string;
   createdDate:string;
   approved:boolean
}
@Component({
  selector: 'app-celebrationcard',
  templateUrl: './celebrationcard.page.html',
  styleUrls: ['./celebrationcard.page.scss'],
})
export class CelebrationcardPage implements OnInit {


  // user
  displayImage: string ;
  username: string ;
  userId: string;
  userEamil: string;
  login: boolean;
  // post
  postData = new Post();
  walletBallance: number;
  receiverName: string;
  message: string;
  postImage: string = null;
  postViews: number;
  likes: number;
  loading: boolean;

  posts: Observable<Post[]>;
  postCollectionRef: AngularFirestoreCollection<Post[]>;

  today = new Date();
  uploadaccess:boolean ;
  uploadPercent: number ;
  downloadURL: Observable<string>;
  constructor(
    private storage: AngularFireStorage,
    // private afAuth: AngularFireAuth,
    private  db: AngularFirestore,
    private ion: IonhelperService,
    public userSer: UserService,
    public auth: AuthService,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private router : Router,
    private walletSer: WalletServiceService
     ) {
       this.getCurrentUser();

       
     }

  OnInit(){ 
    console.log(this.walletBallance)
    if (this.walletBallance < 100)  this.uploadaccess = false
      }

  ngOnInit(){}

  getCurrentUser() {
    this.auth.getAuthState()(
      user => {
        if (user) {
          this.userSer.retrieveUserDocument(user.uid).subscribe(
            userDoc => {
              console.log('user information', userDoc)
              if (userDoc) {
                this.displayImage = userDoc.userImage;
                this.username = userDoc.displayName;
                this.userEamil = userDoc.email;
                this.userId = userDoc.uid;
                this.walletBallance = userDoc.walletBallance
              }
            });
        } else {

        }
    });
  }

  saveBlogPost() {
    this.ion.ionLoading('please wait', 500),
    this.db.collection<Post>('Giftcard').add({
      receiverName: this.receiverName,
      SenderName: this.username,
      userPhoto : this.postImage ,
      authorId: this.userId,
      createdDate: formatDate(this.today, 'hh:mm:ss a', 'en-US', '+0530'),
      approved: false,
      message: this.message
    }).then(data => {
      this.ion.ionLoading('your post was succesfull', 2000);
      console.log(data);
      this.postData.message = '';
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
    const path = `Giftcard/${file.name}`;
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
    spinner: 'bubbles',
    duration: 4000,
    
  });
  await loading.present();
}

 async presentActionSheet() {
   const actionSheet = await this.actionSheetController.create({
     
     header:'You will be charged #100',
     buttons: [{
       text: 'Fund e-wallet ',
       icon: 'menu',
       handler: () => {
         this.router.navigate(['/fondwallet'])
         console.log('user wants to fondwallet his wallet');
       }
     },
      {
       text: 'pay with your wallet',
       icon: 'wallet',
       handler: () => {
         if (this.walletBallance < 100) {
           this.ion.ionToast('You don"t have enough money ', 3000, 'danger')
           this.router.navigate(['/fondwallet'])
          }else{
          this.walletSer.defundWallet(100)
          }
         console.log('Share clicked');
       }
     }, {
       text: 'Cancel',
       icon: 'close',
       role: 'cancel',
       handler: () => {

         console.log('Cancel clicked');
       }
     }]
   });
 
   await actionSheet.present();
 }

}
