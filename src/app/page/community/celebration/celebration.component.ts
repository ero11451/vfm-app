import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GiftCard } from 'src/app/db/model/giftcard';
import { CelebrationService } from 'src/app/db/service/celebration.service';

@Component({
  selector: 'app-celebration',
  templateUrl: './celebration.component.html',
  styleUrls: ['./celebration.component.scss'],
})
export class CelebrationComponent implements OnInit {
  constructor(private afs: AngularFirestore,) { }
  updateCollectionRef: AngularFirestoreCollection<GiftCard>;
  updates: Observable<GiftCard[]>;
  Data
  ngOnInit() {
    this.updateCollectionRef = this.afs.collection('GiftCards');
  this.updateCollectionRef.valueChanges().subscribe(d =>  {
   this.Data = d
   console.log('church updates', d)});
  }

  
}
