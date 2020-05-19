import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service'
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginService, private router:Router){}

  canActivate(): boolean {
    if(this.service.loggedIn()){
      return true;
    } else{
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
