import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIS } from 'apps/milestone/src/environments/api-routes';
import { StorageService } from '../../shared/services/storage.service';
import { USER_CONSTANTS } from '../constants/user.constants';
import { UserData } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: UserData = Object.create(USER_CONSTANTS.DEFAULT_USER_OBJECT);

  userSource$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(this.userData)
  
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  getUserData() {
    this.http.get<UserData>(APIS.users.getUserData)
      .subscribe((userData: UserData) => {
        this.storageService.setValue(USER_CONSTANTS.USER_DATA, userData);
        this.updateData(userData);
      });
  }

  private updateData(value: UserData) {
    this.userSource$.next(value);
  }
}
