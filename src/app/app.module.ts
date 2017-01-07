import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule, JsonpModule, RequestOptions} from '@angular/http';
import { SocialApiService } from './services/socialapi';
import { GeocodeService } from './services/geocode';

import { AgmCoreModule } from 'angular2-google-maps/core';
//import { MapContentComponent } from './map-content/map-content.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWk3ePB8idTw74LyhR8tLSCmVgbZDKiIQ'
    })
  ],
  providers: [SocialApiService, GeocodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
