import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../db/service/user.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.scss'],
})
export class HearderComponent implements OnInit {
  userImage;
  userName;
  userId;
  nodata: boolean = false;
  constructor(
    private auth: AngularFireAuth,
    private user: UserService,
    private nav: Router,
    private menuController: MenuController
  ) {
    this.getUser();
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.auth.currentUser.then(user => {
      this.nodata = true;

      this.user.retrieveUserDocumentFromID(user.uid).subscribe(
        d => {
        if (d) {
          console.log(d);
          this.userImage = d.userImage || '';
          this.userName = d.displayName || '';
          this.userId = d.uid;
        }else{
          this.nodata = true;
        }
      }
      )
    });
  }

  navProfile(){
    
    this.nav.navigate(['tabs/profile', this.userId])
  }
  open(){
    
    this.menuController.open()
  }

}
