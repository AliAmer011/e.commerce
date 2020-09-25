import { Injectable } from '@angular/core';
import { IAcount } from '../Interfaces/iacount';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private h:HttpClient) { }
 



  loggedIn()
 {
    return !!localStorage.getItem('userToken') ;
 }
  
Login(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.h.post(`${environment.loginURl}`, data, { headers: reqHeader });
  }

  Register(user:IAcount)
  {
    const httpOptions =  new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
        });
    return this.h.post(`${environment.DataURl}/Account`, user, { headers: httpOptions });
  }
}



