import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    //this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    // return this._storage?.set(key, value);
    return new Promise((resolve, reject)=>{
      localStorage.setItem(key, JSON.stringify(value));
      resolve('');
    })
  }

  public get(key: string) {
    // return this._storage?.get(key);
    return new Promise((resolve, reject)=>{
      let data = JSON.parse(localStorage.getItem(key));
      resolve(data);
    })
  }

  public remove(key: string) {
    // return this._storage?.remove(key);
    return new Promise((resolve, reject)=>{
      localStorage.removeItem(key);
      resolve('');
    })
  }

  public clear() {
    // return this._storage?.clear()
    return new Promise((resolve, reject)=>{
      localStorage.clear();
      resolve('');
    })
  }
}
