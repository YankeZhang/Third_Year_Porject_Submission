import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {RequestService} from '../../../services/request.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-ibm-req-detail',
  templateUrl: './ibm-req-detail.component.html'
})
export class IbmReqDetailComponent implements OnInit {
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
    this.productId = this.routeInfo.snapshot.queryParams['id'];
    this.service.getOneIBMRequest(this.productId).pipe(map((req:any)=>{
    
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
        this.ibm_staff = req.ibm_staff;
        
        // this.totalMember = this.user_num[this.user_num.length-1]
        // this.universities = this.uni_num[this.uni_num.length-1]
          
      }
    }
    )).subscribe(post=>{
      
    })
    
    console.log(this.productId);
  }

  deny(){
    console.log('deny cliecked');
    this.service.deny(this.reqid,localStorage.getItem('username'));
    this.router.navigateByUrl('/ibm/requests')
  }
  confirm(){
    this.service.confirm(this.reqid,localStorage.getItem('username'));
    this.router.navigateByUrl('/ibm/requests')
  }
  ngOnInit() {
  }
}
