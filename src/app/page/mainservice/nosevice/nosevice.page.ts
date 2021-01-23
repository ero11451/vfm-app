import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NativehelpService } from 'src/app/helper/nativehelp.service';
interface Live {
  youtube: any;
  facebook:any;
  nextservice:any;
  live:boolean
}
@Component({
  selector: 'app-nosevice',
  templateUrl: './nosevice.page.html',
  styleUrls: ['./nosevice.page.scss'],
})
export class NosevicePage implements OnInit {

  constructor(
    private openPageService : NativehelpService,
    private afs: AngularFirestore,) { }

  liveCollectionRef: AngularFirestoreCollection<Live>;
  liveID: Observable<Live[]>;
  Data

  ngOnInit() {
    this.liveCollectionRef = this.afs.collection('liveService');
     this.liveCollectionRef.valueChanges().subscribe(d =>  {
      this.Data = d
      console.log('data', d)});
    // console.log(this.liveID)
   }
openLink(link){
  console.log(link)
  this.openPageService.openWebPage(link)
}
}
