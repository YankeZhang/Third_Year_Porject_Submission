import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private valid = true;
  constructor(private http:HttpClient) { }

  //login 
  login(user){
    return this.http.post('http://localhost:4600/login', user);
  }

  //register
  register(form:any){
    return this.http.post('http://localhost:4600/register', form);
  }

  loggedIn(){
    //if no token in localstorage, then is not loggedin
    if(!!!localStorage.getItem('token')){
      return false
    }
    //send token to server, the server will verify it and send the result back
    this.http.get('http://localhost:4600/token/'+localStorage.getItem('token')).pipe(map((data:any)=>{
    //if token verified, then user is logged in
     if(data==true){
        console.log("valid change to true")
        this.valid = true
        return
      }else{
        //if not, navigate back to login page
        console.log("valid change to false")
        this.valid=false
        return
      }
    })).subscribe()
   return this.valid
}}
