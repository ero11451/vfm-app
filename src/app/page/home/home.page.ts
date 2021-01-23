
import { Component, OnInit } from '@angular/core';
import {  MenuController,  NavController, Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeService } from 'src/app/allapi/youtube.service';
import { ConnectionStatus, NetworkService } from '../../helper/network.service';
import { AllpostService } from 'src/app/db/service/post.service';
import { UserService } from 'src/app/db/service/user.service';
import { takeUntil } from 'rxjs/operators';
// import { Flutterwave } from 'flutterwave-node-v3';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  onlineUsers;
  notNetwork: boolean;
  channelId = 'UCBzSloEG3eNMuk21A4fjqdg';
  playlists: Observable<any>;
  playlist: Observable<any>;
  videos: Observable<any[]>;
  playlistId = 'BzSloEG3eNMuk21A4fjqdg';
  testimonies;
  testimoniesNumber;
  navigate: any;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private youtube: YoutubeVideoPlayer,
    private ion: IonhelperService,
    private list: YoutubeService,
    public sanitizer: DomSanitizer,
    private plt: Platform,
    public navCtrl: NavController,
    private networkSer: NetworkService,
    private blogService: AllpostService,
    private menuController: MenuController,
    private users: UserService,
    ) {


     }
 
    menu(){
      this.menuController.open()
    }
   
  ngOnInit() {
    this.sideMenu()
   }




 


sideMenu() {
  this.navigate =
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



}
