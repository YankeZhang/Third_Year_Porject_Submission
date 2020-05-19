import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts/ng2-charts';
import { MainService } from 'src/app/services/main.service';
import {map} from "rxjs/operators"
import { Router } from "@angular/router";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {

  thisWeek:number=0;
  thisMonth:number=0;
  totalMember:number;
  universities:number;
  lecture:number=0;
  student_support:number=0;
  hachathon:number=0;
  general_events:number=0;

  total:number=0;
  week = [];
  month = [];
  username: string;
  date = [];
  private req_num:number[] = [];
  private user_num:number[] = [];
  uni_num:number[] = [];
  data = [];
  heading = 'Dashboard';
  subheading = 'Main Dashboard';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';
  constructor(public service: MainService, private router: Router) {
    this.username = localStorage.getItem('username');
    //Push data into local array for HTML view to load
    this.service.getDatawithPara(this.username).pipe(map((req:any)=>{
      if (req) {
        console.log(req)
        var i=0
        //The data is pushed by using concat method to prevent data miss reading
        for(i;i<req.request.length;i++){    
          this.date.push(req.request[i].date);
          this.req_num=this.req_num.concat([req.request[i].req_num]);
          this.user_num = this.user_num.concat([req.request[i].user_num]);
          this.uni_num = this.uni_num.concat([req.request[i].uni_num]);
        }
        this.totalMember = this.user_num[this.user_num.length-1]
        this.universities = this.uni_num[this.uni_num.length-1]
        i = 0
        this.thisWeek = req.thisWeek[0].req_num;
        this.thisMonth = req.thisMonth[0].req_num;

        //Calculate event number
        for(i;i<req.type.length;i++){
          switch(req.type[i].type){
            case "Lecture":{
              this.lecture += req.type[i].number;
              this.total+=req.type[i].number
            } break;
            case "Hachathon":{
              this.hachathon += req.type[i].number;
              this.total+=req.type[i].number
            } break;
            case "Student Support":{
              this.student_support += req.type[i].number;
              this.total+=req.type[i].number
            } break;
            case "General Event":{
              this.general_events += req.type[i].number;
              this.total+=req.type[i].number
            } break;
          }
        }
        
      }
    }
    )).subscribe(post=>{
      var i = 0;
      //Parse Date to String
      this.date.map((date:string)=>{
        date=date.slice(0,10).toString().replace(/-/g, '/')
        this.date[i]=date;
        i++;
      })
    })
}

  


  viewAll(){
    this.router.navigateByUrl("/dashboard/requests");
  }
  ngOnInit() {
    
  }

}
