import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private _Router:Router,private _AuthService: AccountService) { }

  
  canActivate():boolean{
    if(this._AuthService.loggedIn())return true
    else 
    {
      this._Router.navigate(["/Home"]);
      return false;
    }
  }
  
}

