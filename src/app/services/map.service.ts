import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getAllLocation(): Observable<Object>{
    return this.http.get("http://localhost:4600/components/map")
  }
  
}
