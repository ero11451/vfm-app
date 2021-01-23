import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  
  switchNotification(newState) {
    console.log(newState)
    // this._helpers.save(LocalStorageKey.showNotification, newState).then(() => {
    //   this.event.publish('notification:setting', newState)
    // });
  }
  notification: boolean;
  close(){
    this.modalController.dismiss()
  }
}
