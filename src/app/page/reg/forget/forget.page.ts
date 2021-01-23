import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  constructor(private actionSheetController: ActionSheetController,
    private router: Router
    ) { }
email
  ngOnInit() {
  }
dresetPassword(email:string): Promise<void> {
    return firebase.default.auth().sendPasswordResetEmail(email);
  }

resetPassword(): void {
  this.dresetPassword(this.email).then(
    async () => {
      const alert = await this.actionSheetController.create({
        header: 'Check your email for a password reset link',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.router.navigateByUrl('/tabs/hom');
            },
          },
        ],
      });
      await alert.present();
    },
    async error => {
      const errorAlert = await this.actionSheetController.create({
        header: error.message,
        buttons: [{ text: 'Ok', role: 'cancel' }],
      });
      await errorAlert.present();
    }
  );
}

}
