import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/db/service/auth.service';
import { UserService } from 'src/app/db/service/user.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
class Notes {
  noteid: string;
  content: string;
  userid: string;
  createdDate: any;
  constructor() {
  this.content = '';
  }
  }
@Component({
  selector: 'app-makenote',
  templateUrl: './makenote.page.html',
  styleUrls: ['./makenote.page.scss'],
})
export class MakenotePage implements OnInit {

 

  // user
  userId: string;
  // post
  notesData = new Notes();
  notesContent: string;

  loading: boolean;

  posts: Observable<Notes[]>;
  postCollectionRef: AngularFirestoreCollection<Notes[]>;

  today = new Date();

  constructor(
    // private afAuth: AngularFireAuth,
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
                this.userId = userDoc.uid;
              }
            });
        } else {
          this.router.navigate(['/login'])
        }
    });
  }

  saveBlogPost() {
    this.ion.ionLoading('please wait', 500),
    this.db.collection<Notes>('notes').add({
      content : this.notesData.content,
      userid: this.userId,
      createdDate: this.today,
      noteid : ''
    }).then(data => {
      this.ion.ionLoading('your note was succesfull', 2000);
      console.log(data);
       this.db.doc('notes/' + data.id).update({notesid:data.id,});
      this.notesData.content = '';
     } ).catch(error => {
        console.log('error',error);
        this.ion.ionLoading('there was an error with your request', 2000);
    });
   
 }


async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'please wait',
    spinner: 'bubbles'
  });
  await loading.present();
}
}
