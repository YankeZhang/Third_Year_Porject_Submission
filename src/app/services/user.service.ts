import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 

  }
  getUserInfo(id){
    var result = this.http.post('http://localhost:4600/user',{user:id});
    console.log(result);
    return result;
  }

  getIBMUserInfo(id){
    var result = this.http.post('http://localhost:4600/ibm/user',{user:id});
    console.log(result);
    return result;
  }
}
