import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SocialApiService {
  constructor(private http: Http) {}
  private socialAPIUrl: string = 'http://192.168.0.18:3000/api'
  getNearbyServices(lat, lng){
    return this.http.get(`${this.socialAPIUrl}/locations?filter[where][latlng][near]=${lat},${lng}&filter[where][latlng][maxDistance]=50`)
      .map(res => res.json())
  }
}
