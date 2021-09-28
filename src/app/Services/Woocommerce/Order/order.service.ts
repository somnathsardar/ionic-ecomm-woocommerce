import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getUrl, getAuthParam, getQueryUrl } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getOrder(id){
    let type = 'orders';
    let _url = getUrl(type)+'/'+id;
    let _params = getAuthParam();
    return this.http.get(_url, {params: _params}).toPromise();
  }
}
