import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getUrl, getAuthParam, getQueryUrl } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  getPaymentGateways(){
    let type = 'payment_gateways';
    let _url = getUrl(type);
    let _params = getAuthParam();
    return this.http.get(_url, {params: _params}).toPromise();
  }

  getTaxes(){
    let type = 'taxes';
    let _url = getUrl(type);
    let _params = getAuthParam();
    return this.http.get(_url, {params: _params}).toPromise();
  }
}
