import { MenuPageModule } from './container/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

import {NgPipesModule} from 'ngx-pipes';

import { Camera, } from '@ionic-native/camera/ngx';


import * as firebase from 'firebase/app';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { FlutterwaveModule } from 'flutterwave-angular-v3';
import { NumberDirective } from './provider/number-directive.directive';
import { DropzoneDirective } from './provider/dropzone.directive';
import { IonicStorageModule } from '@ionic/storage';
 
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
firebase.default.initializeApp(environment.firebaseConfig);


@NgModule({
  declarations: [AppComponent, NumberDirective, DropzoneDirective],
  entryComponents: [],
  imports: [

    // Angular4PaystackModule.forRoot('pk_test_f3d0fe02c3b6e503123604db32b74608f84083c3'),
    NgxIonicImageViewerModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MenuPageModule,
    NgPipesModule,

    FlutterwaveModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    YoutubeVideoPlayer,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    NativeGeocoder,
    Network,

    InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
