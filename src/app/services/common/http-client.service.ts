import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//http üzerinden yapılacak isteklerin sorumluluğu bu serviste olacak
export class HttpClientService {

  constructor( 
    private httpClient: HttpClient, 
    @Inject("baseUrl") private baseUrl: string //app.module içinden api adresini çeker
  ) { }

  private url(requestParameters: Partial<RequestParameters>) {
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}
           /${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
  }

  get<T>(requestParameters: Partial<RequestParameters>) {
    let url: string = "";

    if (requestParameters.fullEndPoint) {
      url = requestParameters.fullEndPoint;
    } else{
      url = `${this.url(requestParameters)}`;
    }

  }

  post() {

  }

  put() {

  }
  
  delete() {

  }
}


export class RequestParameters {
  controller?: string;
  action?: string;

  headers?: HttpHeaders;  
  baseUrl?: string;
  fullEndPoint?: string;
}