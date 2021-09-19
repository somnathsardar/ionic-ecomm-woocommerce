import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getUrl, getAuthParam, getQueryUrl } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type: String;
  constructor(private http:HttpClient) {
    this.type = 'products';
  }
  
  getAllProducts(){
    let _url = getUrl(this.type);
    let _params = getAuthParam();
    return this.http.get(_url, {params: _params}).toPromise();
  }

  getSingleProduct(id){
    let _url = getUrl(this.type);
    let _params = getAuthParam();
    let _newUrl = getQueryUrl(_url, id);
    return this.http.get(_newUrl, {params: _params}).toPromise();
  }
}
