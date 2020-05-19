import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts/ng2-charts';
import { MainService } from 'src/app/services/main.service';
import {map} from "rxjs/operators"
import { Router } from "@angular/router";

@Component({
  selector: 'ibm-app-analytics',
  templateUrl: './analytics.component.html',
})
export class IBMAnalyticsComponent implements OnInit {
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

  uni_list:string[] = []
  req_list:number[] = []
  staff_list:number[] = []
  data = [];
  heading = 'Dashboard';
  subheading = 'Main Dashboard';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  constructor(public service: MainService, private router: Router) {
    this.username = localStorage.getItem('username');
    this.service.getIBMDatawithPara(this.username).pipe(map((req:any)=>{
      
      if (req) {
        console.log(req)
        var i=0
        //console.log(req.request[0].date);
        for(i;i<req.request.length;i++){
           
          this.date.push(req.request[i].date);
          this.req_num=this.req_num.concat([req.request[i].req_num]);
          this.user_num = this.user_num.concat([req.request[i].user_num]);
          this.uni_num = this.uni_num.concat([req.request[i].uni_num]);
          this.thisMonth = this.thisMonth+req.request[i].req_num;
          this.thisWeek = this.thisWeek+req.request[i].req_num;
        }
        i=0
        for(i;i<req.university.length;i++){
           
          
          this.uni_list=this.uni_list.concat([req.university[i].university]);
          this.req_list = this.req_list.concat([req.university[i].req_number]);
          this.staff_list = this.staff_list.concat([req.university[i].user_number]);
          
        }
        
        this.totalMember = this.user_num[this.user_num.length-1]
        this.universities = this.uni_num[this.uni_num.length-1]
        i = 0
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
      //console.log(this.req_num);
      var i = 0;
      this.date.map((date:string)=>{
        date=date.slice(0,10).toString().replace(/-/g, '/')
        this.date[i]=date;
        i++;
      })
      console.log(this.date)
     })
    
  }
  slideConfig6 = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    adaptiveHeight: true,
    dots: true,
  };

  public datasets = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 46, 55, 38, 59, 80],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets2 = [
    {
      label: 'My First dataset',
      data: [46, 55, 59, 80, 81, 38, 65, 59, 80],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets3 = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
      datalabels: {
        display: false,
      },

    }
  ];
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(247, 185, 36, 0.2)',
      borderColor: '#f7b924',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f7b924',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#f7b924',
    },
  ];

  public lineChartColors2: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(48, 177, 255, 0.2)',
      borderColor: '#30b1ff',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#30b1ff',
      pointBackgroundColor: '#ffffff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#30b1ff',
    },
  ];

  public lineChartColors3: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(86, 196, 121, 0.2)',
      borderColor: '#56c479',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#56c479',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#56c479',
    },
  ];

  public labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

  public options = {
    layout: {
      padding: {
        left: 0,
        right: 8,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  };

  ngOnInit() {
  }

}
