import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from 'src/app/db/service/user.service';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/db/service/auth.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
class Devotional {
    Id: string;
    fileUrl: string;
    coverImage: string;
    author: string;
    Title: string;
    authorimage: string;
    createdDate: any;
    day: number
    }
  
@Component({
  selector: 'app-uploaddevotional',
  templateUrl: './uploaddevotional.page.html',
  styleUrls: ['./uploaddevotional.page.scss'],
})
export class UploaddevotionalPage implements OnInit {

   // user
   displayImage: string ;
   username: string ;
   userId: string;
   userEamil: string;
   login: boolean;
   // post
   postData = new Devotional();
 
   postContent: string;
   postImage: string = null;
   postViews: number;
   likes: number;
   loading: boolean;
 
   posts: Observable<any[]>;
   postCollectionRef: AngularFirestoreCollection<any[]>;
 
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
     this.db.collection<any>('devotional').add({
      //  months : this.postData.content,
       author: this.username,
      //  title: this.title,
       authorId: this.userId,
       createdDate: formatDate(this.today, 'hh:mm:ss a', 'en-US', '+0530'),
      
       authorimage: this.displayImage,
       likes: 0,
       postId: ''
     }).then(data => {
       this.ion.ionLoading('your post was succesfull', 2000);
       console.log(data);
      //  this.postData.content = '';
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
    //  this.presentLoading()
     const file = event.target.files[0];
    //  const path = `postImage/${file.name}`;
     if ( file[0].type == 'pdf') {
       this.loadingController.dismiss()
       this.ion.ionToast('please upload only pdf .', 5000, 'primary')
       
     } else {
      this.ion.ionToast('please upload  .', 5000, 'primary')
      //  const task = this.storage.upload(path, file);
      //  const ref = this.storage.ref(path);
      //  task.percentageChanges().subscribe(d =>  {
      //    console.log('Image uploaded!' + d);
      //    this.uploadPercent =  d;
      //    });
      //  console.log('Image uploaded!' + this.uploadPercent);
      //  task.snapshotChanges().pipe(
      //    finalize(() => {
      //      this.downloadURL = ref.getDownloadURL();
      //      this.downloadURL.subscribe(url => (this.postImage = url));
      //      this.loading = false;
      //      this.loadingController.dismiss()
      //    })
      //  )
      //  .subscribe();
     }
   } catch (error) {
     this.loadingController.dismiss()
       return this.ion.ionToast('there was an error', 2000, '');
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
