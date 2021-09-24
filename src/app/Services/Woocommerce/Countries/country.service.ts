import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getUrl, getAuthParam, getQueryUrl } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getAllCountries(){
    let type = 'data/countries';
    let _url = getUrl(type);
    let _params = getAuthParam();
    return this.http.get(_url, {params: _params}).toPromise();
  }

  getStates(countryCode: String){
    let type = 'data/countries/'+countryCode;
    let _url = getUrl(type);
    let _params = getAuthParam();
    return this.http.get(_url, {params: _params}).toPromise();
  }
}
