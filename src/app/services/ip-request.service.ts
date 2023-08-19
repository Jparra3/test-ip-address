import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResultIP, ILocalIP } from '../dto/info-ip.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ResultInfo } from '../dto/result-info';

const ipKey = 'at_LPcc4HjW4Tx8iLLiTINd1Z0ZC4XSm';

@Injectable({
  providedIn: 'root'
})
export class IpRequest {

  @Output() readResult = new EventEmitter<ResultInfo>();

  constructor(private http: HttpClient) {}

  public getLocalIp() {
    const apiURL = 'https://api.ipify.org/?format=json'
    const request = this.http.get<ILocalIP>(apiURL);
    return request;
  }

  public getLocationIp(address: string): Observable<IResultIP> {
    const apiURL= `https://geo.ipify.org/api/v2/country,city?apiKey=${ipKey}&ipAddress=${address}&domain=${address}`;
    // const apiURL= `https://geo.ipify.org/api/v2/country?apiKey=${ipKey}&ipAddress=${address}`;
    const request = this.http.get<IResultIP>(apiURL);

    return request;
  }

}
