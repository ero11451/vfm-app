import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

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
  selector: 'app-homecell',
  templateUrl: './homecell.page.html',
  styleUrls: ['./homecell.page.scss'],
})
export class HomecellPage implements OnInit {


  private updateSubscription: Subscription;

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  zones = [{
    zonename:'Ikpoba Hill Branch, Benin City ',
    lng:5.644400,
    lat:6.273370,
    celllocation:'08056124417',   
    cordinator:'Voice of freedom',
  },
  {
    zonename:'TV/Wire Road Branch, Benin City Address',
    celllocation:'08168944805.',
    cordinator:'Voice of freedom',
    lat: 6.347300, lng:5.619270,
  },
  {
    zonename:'East Circular Branch, Benity',
    celllocation:'08056124417.',
    cordinator:'Voice of freedom',
    lat: 6.273370, lng:5.644400,
  },
  {
    zonename:'Port Harcourt Branch',
    celllocation:'08056124417.',
    cordinator:'Voice of freedom',
    lat:4.867087, lng:7.029963,
  },
  {
    zonename:'Aba Branch 1',
    celllocation:'08056124417.',
    cordinator:'Voice of freedom',
    lat:5.299852, lng:7.460575
  },
  {
    zonename:'Asba Branch',
    celllocation:'08036880321.',
    cordinator:'Voice of freedom',
    lat:6.195858, lng: 6.715617
  },
  {
    zonename:'Delta Branch',
    celllocation:'08023532077.',
    cordinator:'Voice of freedom',
    lat:5.900053,lng:  5.666838
  },
  {
    zonename:'Lagos Branch, Lagos State',
    celllocation:'07034625360',
    cordinator:'Voice of freedom',
    lat:6.593700, lng:   3.297048
  }

  
];


  constructor() {
    this.initMap();
  }

  ngOnInit() {   
  }


  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center:{ lat: 6.303750, lng:5.622800 },
        zoom: 6,
      });
      infowindow = new google.maps.InfoWindow();
      this.zones.forEach(zones =>{
        marker = new google.maps.Marker({
        position: { lat: zones.lat, lng:zones.lng },
        map,
        title: 'Click to zoom',
        draggable: true
      });
      google.maps.event.addListener(marker, 'click', function() {
        // tslint:disable-next-line:max-line-length
        infowindow.setContent('<h3>' 
        + zones.zonename
         + '</h3><p>Zonal Cordinator: ' 
        + zones.cordinator + '<br>Phone number: ' + zones.celllocation + '</p>');
        infowindow.open(map, this);
      });
      })
    }, (error) => {
      console.log(error);
    }, options);
  }

  cell(){}
}
