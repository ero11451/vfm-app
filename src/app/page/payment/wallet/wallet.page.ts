import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { UserService } from 'src/app/db/service/user.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
import { FoundingPage } from '../founding/founding.page';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  walletBallance ;
  userHistory = false;
  greeting;
  constructor(
    private userSer: UserService,
    private auth: AngularFireAuth,
    private router: Router,
    private ion: IonhelperService
    ) { 
      // this.getWalerBallance()
    }

  ngOnInit() {
    this.getWalerBallance()
  
    const time = new Date().getHours();
    if (time < 10) {
      this.greeting = "Good morning";
    } else if (time < 20) {
      this.greeting = "Good day";
    } else {
      this.greeting = "Good evening";
    }
  }
  
  getWalerBallance(){
    this.auth.currentUser.then(user => {
        this.userSer.retrieveUserDocumentFromID(user.uid).subscribe(user => {
        
        this.walletBallance = user.walletBallance;
      });
    })
  }

  doRefresh(event) {
     console.log('Begin async operation');
     this.getWalerBallance()
     setTimeout(() => {
     console.log('Async operation has ended');
     event.target.complete();
   }, 2000);
}

give(){
  this.router.navigate(['/giving',this.walletBallance])
}

fundwallet(){
  this.ion.presentModal(FoundingPage, '', 'bottom-model-setting')
}
}
