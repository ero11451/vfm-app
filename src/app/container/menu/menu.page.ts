
import { FeedbackPage } from '../feedback/feedback.page';
import { LogoutPage } from './../logout/logout.page';

import { IonhelperService } from './../../helper/ionhelper.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, PopoverController } from '@ionic/angular';
import { AboutPage } from '../about/about.page';
import { SettingPage } from '../setting/setting.page';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/db/service/user.service';
import { NetworkService } from 'src/app/helper/network.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  navigate: any;
  userImage;
  userName;
  userId;
  nodata: boolean = false;

  constructor(
    private ion: IonhelperService,
    private auth: AngularFireAuth,
    private user: UserService,
    private nav : Router,
    private menuController: MenuController
  ) {
    this.getUser();
    this.sideMenu();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  sideMenu() {
    console.log('this will get the user ui' , this.userId)
    this.navigate =
    [
      {
        title : 'Wallet',
        url   : '/wallet',
        icon  : 'assets/images/wallet.svg'
      },
      // {
      //   title : 'Chat',
      //   url   : `tabs/chat/${this.userId}`,
      //   icon  : 'assets/homeicon/chat.svg'
      // },
      {
        title : 'Community',
        url   : '/tabs/community',
        icon  : 'assets/homeicon/community.svg'
      },
      // {
      //   title : 'Subscription',
      //   url   : '/subscription', 
      //   icon  : 'assets/icon/subcription.svg'  
      // },
      {
      icon: "assets/homeicon/bible.svg",
      title: 'Bible',
      subtitle: 'Read and study the word of God at any time ',
      animation: 'animate__animated animate__bounceIn animate__faster',
      url:'bible'
    }, 
    {
      icon: "assets/homeicon/gift-card.svg",
      title: 'Gift card',
      subtitle: 'Read and study the word of God at any time ',
      animation: 'animate__animated animate__bounceIn animate__faster',
      url: '/celebrationcard'
    },
    {
      icon: "assets/icon/settings.svg",
      title: 'Setting',
      subtitle: 'Read and study the word of God at any time ',
      animation: 'animate__animated animate__bounceIn animate__faster',
      url:'/setting'
    },
    {
      icon: "assets/icon/market.svg",
      title: 'Market',
      subtitle: 'Read and study the word of God at any time ',
      animation: 'animate__animated animate__bounceIn animate__faster',
      url:'/tabs/market'
    },
    {
      icon: "assets/homeicon/location.svg",
      title: 'Fine Church',
      subtitle: 'Meet and get igroup',
      animation:'animate__animated animate__bounceIn animate__faster',
      url: '/location'
    },
    {
      icon:"assets/homeicon/devotional.svg",
      title:'Devotional',
      subtitle:'Meet and get in ',
      animation:'animate__animated animate__bounceIn animate__faster',
      url: '/devotion'
    },
    {
      icon: "assets/homeicon/homegiveicon.svg",
      title: 'Giving',
      subtitle: 'Meet and get in oup',
      animation: 'animate__animated animate__bounceIn animate__fast',
      url: '/giving'
    },
    // {
    //   icon: "assets/icon/logout.svg",
    //   title: 'Logout',
    //   subtitle: 'Meet and get in oup',
    //   animation: 'animate__animated animate__bounceIn animate__fast',
    //   url:'logout'
    // },
    ];
  }
  getUser(){
    this.auth.currentUser.then(user => {
      this.nodata = true;

      this.user.retrieveUserDocumentFromID(user.uid).subscribe(
        d => {
        if (d) {
          console.log(d);
          this.userImage = d.userImage || '';
          this.userName = d.displayName;
          this.userId = d.uid;
        }else{
          this.nodata = true;
        }
      }
      )
    });
  }

  chat(){
     this.menuController.close()
    
    console.log('this will show the user id ', this.userId)
    this.nav.navigate(['tabs/chat',this.userId])
  }
 async logOut(){
    await this.menuController.close()
    this.ion.presentModal(LogoutPage, '', 'bottom-model')
  }
}
