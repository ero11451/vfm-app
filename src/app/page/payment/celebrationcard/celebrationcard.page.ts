import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { count, finalize } from 'rxjs/operators';
import { GiftCard } from 'src/app/db/model/giftcard';
import { AuthService } from 'src/app/db/service/auth.service';
import { UserService } from 'src/app/db/service/user.service';
import { WalletServiceService } from 'src/app/db/service/wallet-service.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
import { FoundingPage } from '../founding/founding.page';


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
  postData = new GiftCard();

  postContent: string;
  postImage: string = null;
  postViews: number;
  likes: any;
  loading: boolean;

  posts: Observable<GiftCard[]>;
  postCollectionRef: AngularFirestoreCollection<GiftCard[]>;

  today = new Date();

  uploadPercent: number ;
  downloadURL: Observable<string>;
  constructor(
    private storage: AngularFireStorage,
    // private afAuth: AngularFireAuth,
    private walletSerive: WalletServiceService,
    private router: Router,
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
    this.db.collection<GiftCard>('GiftCards').add({
      reciver : this.postData.reciver,
      photo : this.postImage ,
      author: this.postData.author,
      authorId: this.userId,
      createdDate: formatDate(this.today, 'hh:mm:ss a', 'en-US', '+0530'),
      postId: '',
      type:this.postData.type,
      date:this.postData.date
    }).then(data => {
      this.ion.ionLoading('your post was succesfull', 2000);
      console.log(data);
      this.walletSerive.defundWallet(100)
       this.db.doc('post/' + data.id).update({postId:data.id,});
       this.router.navigate(['/tabs/community'])
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
