import { Injectable, Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {MapsAPILoader, NoOpMapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import { Observable } from 'rxjs/Rx';
import './rxjs-operators'
//import { Observable } from 'rxjs/observable';

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
@Injectable()
export class AppComponent implements OnInit{
  constructor(private http: Http){}
  title: string = 'SocialConnect';
  private googleGeocodeUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  private socialAPIUrl: string = 'http://192.168.0.18:3000/api'
  //private http: Http
  lat: number=44.9398;
  lng: number=-123.0394;
  markers: marker[]= [{lat: 44.9041, lng: -123.0248, label: "test", draggable:false}];

  @Input('locale') locale: string;
  ngOnInit(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updateLatLng.bind(this))
    }
    this.getNearbyServices();
  }

  updateLatLng(pos) {
    this.lat = pos.coords.latitude;
    this.lng = pos.coords.longitude;
    this.getNearbyServices();
  }

  geoLocate() {
    let url: string
    url = `${this.googleGeocodeUrl}${this.locale}&key=AIzaSyCWk3ePB8idTw74LyhR8tLSCmVgbZDKiIQ`
    //url = "https://www.reddit.com"
    this.http.get(url).map(this.parseJSONfromHTTP).toPromise()
      .then(data => this.geoCodeupdateLatLng(data));

  }

  geoCodeupdateLatLng(objGeocode) {
    let objWithLatLng: any
    if (typeof objGeocode['results'][0] != 'undefined') {
      objWithLatLng = objGeocode['results'][0]['geometry']['location']
      this.lat = objWithLatLng['lat']
      this.lng = objWithLatLng['lng']
      this.getNearbyServices();
    }
  }

  getNearbyServices(){
    this.http.get(`${this.socialAPIUrl}/locations?filter[where][latlng][near]=${this.lat},${this.lng}&filter[where][latlng][maxDistance]=50`)
      .map(this.parseJSONfromHTTP).toPromise().then(data => this.addMarkers(data))
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

  parseJSONfromHTTP(res: Response): string {
    //console.log(res.text())
    return res.json()
  }
}
