import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { STORAGE_KEYS } from 'src/app/config/config';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  public canActivate(): boolean {
    if (localStorage.getItem(STORAGE_KEYS.token)) {
      return true;
    }

    this.router.navigate(['/enter']);
    return false;
  }
}
