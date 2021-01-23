import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import {  NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
   userlocation;
  constructor(
    private nativeGeocoder: NativeGeocoder,
    public geoLocation: Geolocation,
  ) { }

  ngOnInit() {
  }

  getUserLocation(){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geoLocation.getCurrentPosition().then(resp => {
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
        .then((result) => {
          this.userlocation = result[0].toString();
        }, error => {
          console.log(error)
        });
    }, error => {
      console.log('Error getting location', error);
    })
  }
}
