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

  getShippingMethods(){
    let type = 'shipping_methods';
    let _url = getUrl(type);
    let _params = getAuthParam();
    return this.http.get(_url, {params: _params}).toPromise();
  }

  placeOrder(orderObj:any){
    let type = 'orders';
    let _url = getUrl(type);
    let _params = getAuthParam();
    let body = JSON.stringify(orderObj)
    return this.http.post(_url, body, {headers:{"Content-Type": "application/json"} ,params: _params}).toPromise();
  }
}
