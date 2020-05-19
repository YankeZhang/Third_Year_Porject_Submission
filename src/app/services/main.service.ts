import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }

  getDatawithPara(username: string):Observable<Object>{
    return this.http.get('http://localhost:4600/dashboard/analytics/'+username);
  }

  getIBMDatawithPara(username: string):Observable<Object>{
    return this.http.get('http://localhost:4600/ibm/analytics/'+username);
  }

  getIBMUniversityInfo(){
    return this.http.get('http://localhost:4600/ibm/university');
  }

  getIBMUniversityDetailInfo(university:string){
    return this.http.get('http://localhost:4600/ibm/university-detail/'+university);
  }
}
