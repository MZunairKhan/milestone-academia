import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setValue = (key: string, value: any) => {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
  
  getValue = (key: string): any | null => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };
}
