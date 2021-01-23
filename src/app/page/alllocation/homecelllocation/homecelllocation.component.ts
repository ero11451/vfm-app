import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
declare var google
@Component({
  selector: 'app-homecelllocation',
  templateUrl: './homecelllocation.component.html',
  styleUrls: ['./homecelllocation.component.scss'],
})
export class HomecelllocationComponent implements OnInit {

  constructor() { }

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  ngOnInit() {
    this.initialize()
    // google.maps.event.addDomListener(window, "load", this.initialize());

  }
   initialize() {
    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(
        this.mapElement.nativeElement, {
        center: new google.maps.LatLng(37.4419, -122.1419),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    //Initialize Firebase
    //Create a node at firebase location to add locations as child keys
    var locationsRef = firebase.default.database().ref("zones");
    var bounds = new google.maps.LatLngBounds();
        locationsRef.on('child_added', function(snapshot) {
            var data = snapshot.val();
            console.log(data);
            var marker = new google.maps.Marker({
            position: {
                lat: data.lat,
                lng: data.lng
            },
            map: map,
            label: {
                color: 'white',
                fontWeight: 'bold',
                text: data.user
            }
            });
            bounds.extend(marker.getPosition());
            marker.addListener('click', (function(data) {
            return function(e) {
                infowindow.setContent(data.name + "<br>" + this.getPosition().toUrlValue(6) + "<br>" + data.message + "<br>" + "User:" + data.user);
                infowindow.open(map, this);
            }
            }(data)));
            map.fitBounds(bounds);
        });
    }



}
