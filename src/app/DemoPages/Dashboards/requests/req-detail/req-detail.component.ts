import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {RequestService} from '../../../../services/request.service';
import {map} from 'rxjs/operators';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
@Component({
  selector: 'app-req-detail',
  templateUrl: './req-detail.component.html'
})
export class ReqDetailComponent implements OnInit {

  heading = 'Request Page';
  subheading = 'You can view your request details';
  icon = 'pe-7s-graph text-success';

  private productId : number;
  private state:string;
  private first_name:string;
  private family_name:string;
  private job_title:string;
  private university:string;
  private email:string;
  private phone:number;
  private date: Date;
  private start:Date;
  private end:Date;
  private participant:number;
  private type:string;
  private topic:string;
  private address1:string;
  private address2:string;
  private address3:string;
  private postcode:string;
  private city:string;
  private town:string;
  private ibm_staff:string;
  private reqid:number;

  constructor(private routeInfo:ActivatedRoute, private router: Router, private service:RequestService) {

    //get id of selected request
    this.productId = this.routeInfo.snapshot.queryParams['id'];

    //get request detail with current id
    this.service.getOneRequest(this.productId, localStorage.getItem('username')).pipe(map((req:any)=>{
      //push data to the form, let HTML view to read
      if (req) {
        console.log(req)
        this.reqid = req.req_id
        this.state = req.state
        this.first_name = req.first_name;
        this.family_name = req.family_name
        this.job_title = req.job_title;
        this.university = req.university;
        this.email = req.username;
        this.phone = req.phone;
        this.date = req.date;
        this.start = req.start;
        this.end = req.end;
        this.participant = req.participant;
        this.type = req.type;
        this.topic = req.topic;
        this.address1 = req.address1;
        this.address2 = req.address2;
        this.address3 = req.address3;
        this.postcode = req.postcode;
        this.city = req.city;
        this.town = req.town;
        this.ibm_staff = req.ibm_staff
          
      }
    }
    )).subscribe()
  }

  
  //Back to request page
  goBack(){
    this.router.navigateByUrl('/dashboard/requests');
  }
  
  ngOnInit() {
  }
  
}
