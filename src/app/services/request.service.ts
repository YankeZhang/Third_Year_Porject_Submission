import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  getAllPosts(username:string): Observable<Object> {
    return this.http.get('http://localhost:4600/posts/'+username)
  }

  getOneRequest(id:number,username:string):Observable<Object>{
    return this.http.get('http://localhost:4600/dashboard/request-detail/'+id+'/'+username);
  }

  getOneIBMRequest(id:number):Observable<Object>{
    return this.http.get('http://localhost:4600/ibm/request-detail/'+id);
  }

  deny(id:number, user:string){
    this.http.post('http://localhost:4600/forms/request/', {type:'deny',id:id, user:user}).subscribe(next => {
      console.log('denied');
    });
  }

  confirm(id:number, user:string){
    this.http.post('http://localhost:4600/forms/request/', {type:'confirm',id:id, user:user}).subscribe(next => {
      console.log('confirmed');
    });
  }

  
}
