import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../entities/user';
import { BE_ROUTES } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public createUser(user: User): Observable<any> {
    return this.httpClient.post(`${BE_ROUTES.base}${BE_ROUTES.createUser}`, user);
  }

  public logIn(user: User) {
    return this.httpClient.post(`${BE_ROUTES.base}${BE_ROUTES.logIn}`, user);
  }
}
