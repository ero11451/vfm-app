import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NetworkService } from './helper/network.service';
import { IonhelperService } from './helper/ionhelper.service';
import { LogoutPage } from './container/logout/logout.page';
import { Router } from '@angular/router';
import { NativehelpService } from './helper/nativehelp.service';
// import { timer } from 'rxjs/internal/observable/timer';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  userImage;
  userName;
  userId;
  nodata: boolean = false;
  showSlash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ion: IonhelperService,
    private menuController: MenuController,
    private nativeHelp: NativehelpService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#0074e4');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    // timer(3000).subscribe(() => this.showSlash = false)
  }
  navigate =
    [
      {
        title : 'Wallet',
        url   : '/tabs/wallet',
        icon  : 'wallet'
      },
      {
        title : 'Feedback',
        url   : `/feedback`,
        icon  : 'chatbox'
      },
   
      {
        title : 'Live service',
        url   : '/noservice', 
        icon  : 'play'  
      },
      {
        title : 'Contact Pastor',
        url   : '/pastor', 
        icon  : 'call'  
      },
      {
      icon: "book",
      title: 'Bible',
      subtitle: 'Read and study the word of God at any time ',
      animation: 'animate__animated animate__bounceIn animate__faster',
      url:'/bible'
    }, 

    {
      icon: "settings",
      title: 'Setting',
      subtitle: 'Read and study the word of God at any time ',
      animation: 'animate__animated animate__bounceIn animate__faster',
      url:'/setting'
    },
    {
      icon: "chatbox-ellipses-outline",
      title: 'About',
      subtitle: 'Read and study the word of God at any time ',
      animation: 'animate__animated animate__bounceIn animate__faster',
      url:'/setting'
    },
    {
      icon: "location",
      title: 'Find Church/Cell',
      subtitle: 'Meet and get igroup',
      animation:'animate__animated animate__bounceIn animate__faster',
      url: '/location'
    },
    {
      icon:"document-text",
      title:'Devotional',
      subtitle:'Meet and get in ',
      animation:'animate__animated animate__bounceIn animate__faster',
      url: '/devotion'
    }
    ];
  
 async logOut(){
    await this.menuController.close()
    this.ion.presentModal(LogoutPage, '', 'bottom-model')
  }

  openWebpage(page) {
    this.menuController.close().then(u => this.nativeHelp.openWebPage(page))
  }
  
}
