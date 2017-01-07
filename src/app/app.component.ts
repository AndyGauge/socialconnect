import { Component, Input, OnInit } from '@angular/core';
import {MapsAPILoader, NoOpMapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import { Observable } from 'rxjs/Rx';
import './rxjs-operators';
import { SocialApiService } from './services/socialapi';
import { GeocodeService } from './services/geocode';

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  icon?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private socialApi:SocialApiService, private geocode:GeocodeService){}
  title: string = 'SocialConnect';


  //private http: Http
  lat: number=44.9398;
  lng: number=-123.0394;
  markers: marker[];

  @Input('locale') locale: string;
  ngOnInit(){
    this.socialApi.getNearbyServices(this.lat, this.lng).subscribe(data => this.addMarkers(data));
  }

  geoLocate() {
    this.geocode.geoLocate(this.locale).subscribe(data => this.geoCodeupdateLatLng(data));
  }

  geoCodeupdateLatLng(objGeocode) {
    let objWithLatLng: any
    if (typeof objGeocode['results'][0] != 'undefined') {
      objWithLatLng = objGeocode['results'][0]['geometry']['location']
      this.lat = objWithLatLng['lat']
      this.lng = objWithLatLng['lng']
      this.socialApi.getNearbyServices(this.lat, this.lng).subscribe(data => this.addMarkers(data));
    }
  }

  addMarkers(data) {
    this.markers = [];
    for (var location of data) {
      this.markers.push({
        lat: location['latlng']['lat'],
        lng: location['latlng']['lng'],
        label: location['name'],
        draggable: false
      })
    }
  }
}
