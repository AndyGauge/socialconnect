import { Injectable, Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import './rxjs-operators'
//import { Observable } from 'rxjs/observable';


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
  //private http: Http
  lat: number=44.9398;
  lng: number=-123.0394;

  @Input('locale') locale: string;
  ngOnInit(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updateLatLng.bind(this))
    }
  }

  updateLatLng(pos) {
    this.lat = pos.coords.latitude;
    this.lng = pos.coords.longitude;
    console.log(pos)
  }

  geoLocate() {
    let url: string
    url = `${this.googleGeocodeUrl}${this.locale}&key=AIzaSyCWk3ePB8idTw74LyhR8tLSCmVgbZDKiIQ`
    //url = "https://www.reddit.com"
    this.http.get(url).map(this.parseGeocodeResponse).toPromise()
    .then(data => this.geoCodeupdateLatLng(data))
  }

  geoCodeupdateLatLng(objGeocode) {
    let objWithLatLng: any
    if (typeof objGeocode['results'][0] != 'undefined') {
      objWithLatLng = objGeocode['results'][0]['geometry']['location']
      this.lat = objWithLatLng['lat']
      this.lng = objWithLatLng['lng']
    }

  }


  parseGeocodeResponse(res: Response): string {
    //console.log(res.text())
    return res.json()
  }
}
