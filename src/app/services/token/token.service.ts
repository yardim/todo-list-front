import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private httpClient: HttpClient) { }

  public createUser(user: User) {
    this.httpClient.post('http://localhost:3000/users/create', user, { observe: 'response' })
      .subscribe((res: any) => {
        console.log(res.headers);
        console.log(res.headers.get('x-auth'));
        // localStorage.setItem('token', data.token);
      });
  }
}
