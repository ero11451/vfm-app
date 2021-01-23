import { Injectable } from '@angular/core';
import {
    AlertController,
    LoadingController,
    PickerController,
    ToastController,
    ActionSheetController,
    PopoverController,
    ModalController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonhelperService {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private pickerController: PickerController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController
    ) { }

  async ionModal(pages, props) {
    const modal = await this.modalController.create({
    component: pages,
    componentProps: props
    });
    await modal.present();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
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
  async ionAlert(header, subHeader, message) {
    const alert = await this.alertController.create({ header,subHeader,  message,  buttons: ['OK'] });
    await alert.present();
  }
  async ionLoading(message, duration) {
    const loading = await this.loadingController.create({
      message,      duration,      spinner: 'circles'
    });
    await loading.present();
  }

 async presentToast(message, time, color) {
   const toast = await this.toastController.create({
     message, duration: time, color
   });
   toast.present();
 }

  async presentPicker() {
    const picker = await this.pickerController.create({
    animated: true,
    buttons: [{
      text: 'Save',
      handler: () => console.log('Clicked Save!')
    }, {
      text: 'Log',
      handler: (val) => {
        console.log('Clicked Log. Do not Dismiss.', val);
        return false;
      }
    }],
    columns: [
      {
        name: 'hours',
        prefix: 'total',
        suffix: 'hours',
        options: [
          {
            text: '1',
            value: '01'
          },
          {
            text: '2',
            value: '02'
          }
        ]
      }
    ],
    cssClass: 'picker-hours',
    mode: 'ios',
    });
    picker.present();
  }
  async ionToast(message, duration, color) {
    const toast = await this.toastController.create({ message, duration, color});
    toast.present();
  }
  async presentModal(page , prop, style) {
    const modal = await this.modalController.create({
    component: page,
    componentProps: {
      'userid':prop
    },
    cssClass: style
    });
    await modal.present();
  }
  async networkActionSheet(text) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Network',
      buttons: [{
        text: '',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
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

  async presentPopover(page, ev: any) {
    const popover = await this.popoverController.create({
      component: page,
      event: ev,
      translucent: false
    });
  
    await popover.present();
  }

  
}
