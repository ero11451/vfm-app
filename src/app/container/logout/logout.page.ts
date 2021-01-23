import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../db/service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor( 
    private auth : AuthService,
    private modalController: ModalController) { }

  ngOnInit() {
  }
  close(){
   this.modalController.dismiss();
  }
 logout(){
   this.modalController.dismiss().then(d => this.auth.SignOut());
  }
}
