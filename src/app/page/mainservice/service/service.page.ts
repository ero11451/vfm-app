import { ServicemenuPage } from './../servicemenu/servicemenu.page';

import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
import { AuthService } from 'src/app/db/service/auth.service';
import { UserService } from 'src/app/db/service/user.service';
import { formatDate } from '@angular/common';
import { ServiceComment } from '../../../db/model/service';
import { ServiceService } from '../../../db/service/service.service';
import { takeUntil } from 'rxjs/operators';

interface Live {
  link: any;
  title:any;
}
@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})

export class ServicePage implements OnInit {
  santiziLinke: any;
  link:string = 'tyyHr5w15FA';

  postData = new ServiceComment();

  posts;
  postCollectionRef: AngularFirestoreCollection<ServiceComment[]>;

  // user
  displayImage: string ;
  username: string ;
  userId: string;
  userEamil: string;
  login: boolean;
  userLocation: string;
  today = new Date();

  private unsubscribe$ = new Subject<void>();
  constructor(
    public sanitizer: DomSanitizer,
    private  db: AngularFirestore,
    private ion: IonhelperService,
    public userSer: UserService,
    private servieSer: ServiceService,
    public auth: AuthService,
     ) {
    
    this.sanitizer = sanitizer;
    this.getLink();
    }

  ngOnInit() {
    this.getCurrentUser();
    this.getCommmrnt();
  }
  getLink(){
      this.santiziLinke = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${this.link}`);
  }
 
  getServiceDetail(){
    
  }
  getCommmrnt(){
    this.servieSer.getAllCommentsForService(this.link).
    pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
    this.posts = result;
    console.log('post', result);
    });
  }
  getCurrentUser() {
    this.auth.getAuthState()(
      user => {
        if (user) {
          console.log('user information', user);
          this.userSer.retrieveUserDocument(user.uid).subscribe(
            userDoc => {
              if (userDoc) {
                this.displayImage = userDoc.userImage;
                this.username = userDoc.displayName;
                this.userEamil = userDoc.email;
                this.userId = userDoc.uid;
                this.userLocation = userDoc.location;
              }
            });
        } else {

        }
    });
  }


  saveBlogPost() {
  const data =  {
      content : this.postData.content,
      author: this.username,
      authorId: this.userId,
      createdDate: formatDate(this.today, 'hh:mm:ss a', 'en-US', '+0530'),
      authorimage: this.displayImage,
      authorLocation: this.userLocation,
      serviceId: this.link
    }
    console.log(data)
    this.db.collection('seriveComment').add({
      content: data.content,
      author: data.author,
      authorId: data.authorId,
      authorimage: data.authorimage,
      serviceId: data.serviceId,
      createdDate: data.createdDate

    }).then(data => {
      // this.posts = data;
      console.log('your post was succesfull', 2000);
      // console.log(data);
      this.postData.content = '';
     } ).catch(error => {
        console.log('error', error);
        this.ion.ionLoading('there was an error with your request', 2000);
    });
 }


}
