import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Platform, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MenuPage } from 'src/app/container/menu/menu.page';
import { IonhelperService } from 'src/app/helper/ionhelper.service';
import { YoutubeService } from '../../../allapi/youtube.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messgaelist',
  templateUrl: './messgaelist.page.html',
  styleUrls: ['./messgaelist.page.scss'],
})
export class MessgaelistPage implements OnInit {

  notNetwork: boolean;
  channelId = 'UCxN3lKZszErqjhMPvSRTwRg';
  SwimChannelId = 'UCBzSloEG3eNMuk21A4fjqdg';
  //  tsl channel id the one delow
  // channelId = 'UC2eJZ7eVkmzgOP8TMPLqaqA';
  playlists: Observable<any>;
  playlist: Observable<any>;
  SwimPlayLists: Observable<any>;
  SwimPlayList: Observable<any>;
  videos: Observable<any[]>;
  // playlistId = 'PLNG2aD8yvXdi7znHBfzPy3Y4gmp0Ga1ET';
 constructor(
   private youtube: YoutubeVideoPlayer,
   private ion: IonhelperService,
   private list: YoutubeService,
   public sanitizer: DomSanitizer,
   private plt: Platform,
   private router: Router
   ) {

   this.sanitizer = sanitizer;
   }

 ngOnInit() {
    this.getShow();
    this.getSwimList();
   }

 getShow(){
     this.playlists = this.list.getPlaylistsForChannel(this.channelId);
     this.playlists.subscribe(data => {
       this.playlist = data.items;
       this.notNetwork = false;
       console.log(' playlists', data.items );
       }, err => {
       console.log(err);
       this.ion.ionToast('there was an error', 1000, 'primary')
       this.notNetwork = true;
     });
  }

  getSwimList(){
    this.SwimPlayLists = this.list.getPlaylistsForChannel(this.SwimChannelId);
    this.SwimPlayLists.subscribe(data => {
      this.SwimPlayList = data.items;
      this.notNetwork = false;
      console.log('swim playlists: ', data.items );
      }, err => {
      console.log(err);
      this.ion.ionToast('there was an error', 1000, 'primary')
      this.notNetwork = true;
    });
  }

  openVideo(video) {
   console.log(video.id.videoId);
   if (this.plt.is('cordova')) {
     this.youtube.openVideo(video.id.videoId);
   } else {
     window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`);
   }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getShow()
    this.getSwimList()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  navTo(channelId){
   this.router.navigate(['messgaelist', channelId]);
  }

//  getlist(){
//    this.list.getPlaylistsForChannel(this.playlistId).subscribe(d => console.log('platelist', d))
//  }
  }
