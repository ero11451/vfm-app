
import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';

import {
  Platform
} from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

declare var google: any;
let map: any;
let marker: any;
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
let infowindow: any;
const iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
const maicon = {
  url:
    'https://i.imgur.com/hIoBt31.png',

};

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
declare var google;
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})


export class LocationPage implements OnInit {

  private updateSubscription: Subscription;

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  zones = [];

  constructor() {
    firebase.default.database().ref('zones/').on('value', resp => {
      this.zones = [];
      this.zones = snapshotToArray(resp);
      for (const donor of this.zones) {
        this.createMarkers(donor);
      }
    });
    this.initMap();
  }

  ngOnInit() {

    firebase.default.database().ref('zones/').on('value', resp => {
      this.zones = [];
      this.zones = snapshotToArray(resp);
      for (const donor of this.zones) {
        this.createMarkers(donor);
      }
    });
  }

  ngAfterViewInit() {
     this.initMap();
     firebase.default.database().ref('zones/').on('value', resp => {
          this.zones = [];
          this.zones = snapshotToArray(resp);
          for (const donor of this.zones) {
            this.createMarkers(donor);
          }
        });
  }

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center:{ lat: 6.303750, lng:5.622800 },
        // center: { lat: location.coords.latitude, lng:location.coords.longitude},
        zoom: 7
      });

      infowindow = new google.maps.InfoWindow();


      marker = new google.maps.Marker({
        position: { lat: 6.303750, lng:5.622800 },
        map,
        title: 'Click to zoom',
        // icon:     "a",
        draggable: true
      });

      map.addListener('center_changed', () => {
        window.setTimeout(() => {
          map.panTo(marker.getPosition());
        }, 300000000);
      });

      marker.addListener('click', (event: any) => {
        console.log(marker.getPosition().lat());
        console.log(marker.getPosition().lng());
        infowindow.setPosition(event.latLng);
        infowindow.setContent('<div class ="p-2 pr-2 " >' + '<p>Pastor: Bishop Abraham Chigbundu</p>' + '<p>phone:0907574875</p>' +
        '<p>Headquarters/>p' +
        '<small><a  + marker.getPosition().lat() ' + '' + marker.getPosition().lng()  + '"></a></small>' + '</div>');
        infowindow.open(map, marker);
      });
    }, (error) => {
      console.log(error);
    }, options);
  }

  createMarkers(place: any) {
    const latitude = parseFloat(place.coords.latitude);
    const longitude = parseFloat(place.coords.longitude);
    const zoneMarker = new google.maps.Marker({
      map,
      position: { lat: latitude, lng: longitude },
      // labelOrigin: new google.maps.Point(55, 12),
      label: {
        text: place.zonename,
        color: 'orange',
        fontSize: '12px',
        x: '200',
        y: '100'
      },
      icon: 'https://i.imgur.com/hIoBt31.png'


    });

    google.maps.event.addListener(zoneMarker, 'click', function() {
      // tslint:disable-next-line:max-line-length
      infowindow.setContent('<h3>' + place.zonename + '</h3><p>Zonal Cordinator: ' + place.cordinator + '<br>Cell location: ' + place.celllocation + '</p>');
      infowindow.open(map, this);
    });
  }

}

// import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
// import { NavController, Platform } from '@ionic/angular';
// import { Router } from '@angular/router';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

// declare var google;
// declare const NavigationBar: any;
// type Sections = 'Pharmacies' | 'Grocery Stores';
// @Component({
//   selector: 'app-map-home',
//   templateUrl: './location.page.html',
//   styleUrls: ['./location.page.scss'],
// })
// export class LocationPage implements OnInit {

//   @ViewChild('map') mapElement: ElementRef;
//   map: any;
//   start = 'chicago, il';
//   end = 'chicago, il';
//   directionsService = new google.maps.DirectionsService;
//   directionsDisplay = new google.maps.DirectionsRenderer;

//   constructor(public navCtrl: NavController) {

//   }
//   ngOnInit() {
//     this.map = new google.maps.Map(this.mapElement.nativeElement, {
//       zoom: 7,
//       center: {lat: 41.85, lng: -87.65}
//     });

//     this.directionsDisplay.setMap(this.map);
//   }

//   // ionViewDidLoad(){
//   //   this.initMap();
//   // }

//   // initMap() {
//   //   this.map = new google.maps.Map(this.mapElement.nativeElement, {
//   //     zoom: 7,
//   //     center: {lat: 41.85, lng: -87.65}
//   //   });

//   //   this.directionsDisplay.setMap(this.map);
//   // }

//   calculateAndDisplayRoute() {
//     this.directionsService.route({
//       origin: this.start,
//       destination: this.end,
//       travelMode: 'DRIVING'
//     }, (response, status) => {
//       if (status === 'OK') {
//         this.directionsDisplay.setDirections(response);
//       } else {
//         window.alert('Directions request failed due to ' + status);
//       }
//     });
//   }

// }
