import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { STORAGE_KEYS } from 'src/app/config/config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem(STORAGE_KEYS.token);

    if (!token) {
      return next.handle(request);
    }

    const headers = new HttpHeaders({ Authorization: token });
    const reqClone = request.clone({ headers });

    return next.handle(reqClone);
  }
}
