import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { Map, Marker, marker, tileLayer, Icon, icon } from 'leaflet';
import { IpRequest } from './services/ip-request.service';
import { IResultIP, ILocalIP } from './dto/info-ip.dto';
import { FormControl } from "@angular/forms";
import { ResultInfo } from './dto/result-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  public ipRequest = inject(IpRequest);

  input = new FormControl('');

  myMap!: Map;
  markerItem!: Marker;
  customIcon!: Icon;

  resultInfo: ResultInfo = new ResultInfo({});

  constructor() {
    this.customIcon = icon({
      iconUrl: this.resolveUrl('assets/images/icon-location.svg'),
      iconSize: [32, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  }

  ngAfterViewInit(){
    this.myMap = new Map('map').setView([2.93264, -75.2811], 15);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.myMap);
  }

  private resolveUrl(url: string): string {
    return new URL(url, document.baseURI).toString();
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation(){
    this.ipRequest.getLocalIp().subscribe((data: ILocalIP) => {
      this.input.setValue(data.ip);
      this.getSearch()
    })
  }

  public getSearch(e?: SubmitEvent): void {
    e?.preventDefault();
    if (this.input.value) {
      this.ipRequest.getLocationIp(this.input.value).subscribe((response: IResultIP) => {
        this.resultInfo.ip = response.ip;
        this.resultInfo.location = `${response.location.city}, ${response.location.region}, ${response.location.country}`;
        this.resultInfo.timezone = `UTC ${response.location.timezone}`;
        this.resultInfo.isp = response.isp;

        this.ipRequest.readResult.emit(this.resultInfo);

        if (this.myMap) {
          if (this.markerItem) {
            this.markerItem.removeFrom(this.myMap);
          }

          this.markerItem = marker([response.location.lat, response.location.lng], { icon: this.customIcon }).addTo(this.myMap);
          this.myMap.fitBounds([
            [this.markerItem.getLatLng().lat, this.markerItem.getLatLng().lng]
          ]);
        }
      })
    }
  }
}
