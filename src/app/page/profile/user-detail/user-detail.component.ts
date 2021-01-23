import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/db/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userImage: string;
  userDisplayName: string;
  status: string;
  bio: string;
  userEmail: string;
  isCurrentUser: boolean;
  userid: string;
  currentuid;
  isLoggedIn: boolean;
  walletBallance:number
  phone:number
  constructor(
    private userSer: UserService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.getUserData()
  }

  getUserData(){
    this.userSer.retrieveUserDocumentFromID(this.userid).subscribe(user => {
       this.userDisplayName = user.displayName;
       this.bio = user.bio;
       this.status = user.status;
       this. userEmail = user.email;
       this.userImage = user.userImage;
       this.walletBallance = user.walletBallance;
       this.phone = user.phoneNumber
    });
  }
  close(){
    this.modalController.dismiss()
  }
}
