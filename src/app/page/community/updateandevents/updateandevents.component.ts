import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
interface Update {
  description: any;
  title:any;
  image:any;
  updateid:boolean;
  date:any
}
@Component({
  selector: 'app-updateandevents',
  templateUrl: './updateandevents.component.html',
  styleUrls: ['./updateandevents.component.scss'],
})
export class UpdateandeventsComponent implements OnInit {

  constructor(private afs: AngularFirestore,) { }
  updateCollectionRef: AngularFirestoreCollection<Update>;
  updates: Observable<Update[]>;
  Data

  ngOnInit() {
    this.updateCollectionRef = this.afs.collection('churchupdate');
     this.updateCollectionRef.valueChanges().subscribe(d =>  {
      this.Data = d
      console.log('church updates', d)});
    // console.log(this.liveID)
   }
}
