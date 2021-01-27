
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NativehelpService } from 'src/app/helper/nativehelp.service';
// import { Flutterwave } from 'flutterwave-node-v3';
interface Banner {
  image: any;
  id:any;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 

  constructor(
    private afs: AngularFirestore,) { }

  liveCollectionRef: AngularFirestoreCollection<Banner[]>;
  Data

  ngOnInit() {
    this.liveCollectionRef = this.afs.collection('homebenner');
     this.liveCollectionRef.valueChanges().subscribe(d =>  {
      this.Data = d
      console.log('data', d)});
    // console.log(this.liveID)
   }




 


  navigate =
  [
    {
      title : 'Wallet',
      url   : '/tabs/wallet',
      icon: "assets/homeicon/homegroup/wallet.png",
      subtitle: 'give and fund',
      animation:'animate__animated animate__bounceIn animate__faster',
    },
    {
    icon: "assets/homeicon/homegroup/bible.png",
    title: 'Bible',
    subtitle: 'Read the word of God . ',
    animation: 'animate__animated animate__bounceIn animate__faster',
    url:'/bible'
  }, 
 
  {
    icon: "assets/homeicon/homegroup/location.png",
    title: 'Location',
    subtitle: 'branch close to you ',
    animation:'animate__animated animate__bounceIn animate__faster',
    url: '/location'
  },
  {
    icon: "assets/homeicon/homegroup/community.svg",
    title:'Community',
    subtitle:'Read more..',
    animation:'animate__animated animate__bounceIn animate__faster',
    url: '/tabs/community'
  },
{
  icon: "assets/homeicon/homegroup/Notes.png",
  title:'Notes',
  subtitle:'Read more..',
  animation:'animate__animated animate__bounceIn animate__faster',
  url: '/notelist'
},
{
  icon: "assets/homeicon/homegroup/messages.png",
  title:'Live service',
  subtitle:'Read more..',
  animation:'animate__animated animate__bounceIn animate__faster',
  url: '/nosevice'
},
{
  icon:"assets/homeicon/homegroup/store.svg",
  title:'Store',
  subtitle:'Read more..',
  animation:'animate__animated animate__bounceIn animate__faster',
  url: '/tabs/market'
},
{
  icon:"assets/homeicon/homegroup/feedback.png",
  title:'Messages',
  subtitle:'Read more..',
  animation:'animate__animated animate__bounceIn animate__faster',
  url: '/tabs/messsage'
},

{
  icon: "assets/homeicon/homegroup/devotional.png",
  title:'Devotional',
  subtitle:'Read more..',
  animation:'animate__animated animate__bounceIn animate__faster',
  url: '/tabs/devotion'
},
  ];




}
