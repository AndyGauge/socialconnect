import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GeocodeService {
  constructor(private http: Http) {}
  private googleGeocodeUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?address='

  geoLocate(locale) {
    let url: string
    url = `${this.googleGeocodeUrl}${locale}&key=AIzaSyCWk3ePB8idTw74LyhR8tLSCmVgbZDKiIQ`
    return this.http.get(url).map(res => res.json())
  }
}
