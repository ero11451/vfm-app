import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Platform, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { YoutubeService } from 'src/app/allapi/youtube.service';
import { IonhelperService } from 'src/app/helper/ionhelper.service';

@Component({
  selector: 'app-messgaedetail',
  templateUrl: './messgaedetail.page.html',
  styleUrls: ['./messgaedetail.page.scss'],
})
export class MessgaedetailPage implements OnInit {


  notNetwork: boolean;
  channelId: string;
  //  tsl channel id the one delow
  // channelId = 'UC2eJZ7eVkmzgOP8TMPLqaqA';
  playlists: Observable<any>;
  playlist: Observable<any>;
  videos: Observable<any[]>;
  playlistId = 'PLOU4BjPF6BrP8WOrR0CLiS4_KcuoLXN7d'
 constructor(
   private youtube: YoutubeVideoPlayer,
   private ion: IonhelperService,
   private list: YoutubeService,
   public sanitizer: DomSanitizer,
   private plt: Platform,
   private route: ActivatedRoute,
   ) {
    if (this.route.snapshot.params.channelId) {
      this.channelId = this.route.snapshot.params.channelId;
      console.log(this.channelId);
      }

   this.sanitizer = sanitizer;
   }

 ngOnInit() {
    this.getShow();
   }

 getShow(){
     this.playlists = this.list.getPlaylistsForChannel(this.channelId);
     this.playlists.subscribe(data => {
       this.playlist = data.items;
       this.notNetwork = false;
       console.log('playlists: ', data.items );
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
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

 getlist(){
   this.list.getPlaylistsForChannel(this.playlistId).subscribe(d => console.log('platelist', d))
 }
}
