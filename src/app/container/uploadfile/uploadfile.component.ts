import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss'],
})
export class UploadfileComponent implements OnInit {
  @Input() userid: string;

  uploadPercent: number ;
  downloadURL: Observable<string>;
  userphotoURL 

  db = firebase.default.firestore();
  constructor(
    private ion: IonhelperService,
    private aroute: ActivatedRoute,
    private model: ModalController,
    private storage: AngularFireStorage,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    console.log(this.userid)
  }

  close(){
    this.model.dismiss();
  }

 loading;
  chackImage() {
    const db = firebase.default.firestore();
    const storyRef = db.collection('users').doc(`${this.userid}`);

    storyRef.update({ "userImage": 'newprofilimaeg' } )
    .then(data => {
      this.ion.ionToast('your image has being changed successfully', 2000, '');
      console.log(data);
     } ).catch(error => {
        console.log(error);
        this.ion.ionLoading('there was an error with your request', 2000);
    });
  }
    uploadPostImage(event) {
      this.presentLoading()
      const file = event.target.files[0];
      const path = `profilImage/${file.name}`;
      if ( file.type.split('/')[0] !== 'image') {
        return alert('Only Image Files');
      } else {
        const task = this.storage.upload(path, file);
        const ref = this.storage.ref(path);
        task.percentageChanges().subscribe(d =>  {
           console.log('Image uploaded!' + d);
           this.loading = true;
           this.uploadPercent =  d;
          });
        console.log('Image uploaded!' + this.uploadPercent);
        task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = ref.getDownloadURL();
            this.downloadURL.subscribe(url => (
              this.db.collection('users').doc(this.userid).update({"userImage": url})));
            this.loading = false;
            this.model.dismiss()
            this.ion.ionToast('your upload was successful', 2000, 'primary');
            this.loadingController.dismiss();

          })
        )
        .subscribe();
      }
    }
    async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'please wait ',
        spinner: 'bubbles'
      });
      await loading.present();
    }
}
