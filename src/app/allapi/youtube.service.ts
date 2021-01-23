
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  apiKey = 'AIzaSyDdpOW__Ut8x-KU1hXvSwiPoGlBbYwWJLw';
  // {

    // apiKey = 'AIzaSyCfi_tdfQd4ZC0CLurRy2e5sqsQ0SiAvWY';

  constructor( private http: HttpClient) { }

    getPlaylistsForChannel(channel){
      // return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20')
      return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&maxResults=10&order=date&type=video&key=${this.apiKey}`)
      // .pipe(map((res) =>  res) );
    }
   
    getListVideos(listId) {
      return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId + '&part=snippet,id&maxResults=20')
      .pipe(map((res) =>  res )
      );
    }



  // apiKey = 'AIzaSyDZhzsXekYMrpg64cu4Mmm8WMS4DO_anII';

  // constructor(public http: HttpClient, private youtube: YoutubeVideoPlayer, private plt: Platform) { }

  // getPlaylistsForChannel(channel) {
  // tslint:disable-next-line: max-line-length
  //   return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20');

  // }

  // getListVideos(listId) {
  // tslint:disable-next-line: max-line-length
  //   return this.http.get<YoutubeChannel>(`https://www.googleapis.com/youtube/v3/playlistItems?key=${this.apiKey}&playlistId=${listId}&part=snippet,id&maxResults=20`);
  // }

  // openVideo(videoId) {
  //   console.log(videoId);
  //   if (this.plt.is('cordova')) {
  //     this.youtube.openVideo(videoId);
  //   } else {
  //     window.open(`https://www.youtube.com/watch?v=${videoId}`);
  //   }
  // }









}