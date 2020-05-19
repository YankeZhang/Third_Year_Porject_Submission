import {Component, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ChartComponent} from 'ng-apexcharts';
import { ActivatedRoute, Router } from "@angular/router";
import { MainService } from 'src/app/services/main.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'ibm-app-university-detail',
  templateUrl: './universitydetail.component.html',
  styles: []
})
export class IBMUniversityDetailsComponent {
  heading = 'University Detail';
  subheading = 'You can view university details here.';
  icon = 'pe-7s-graph2 icon-gradient bg-happy-green';

  @ViewChild('chart') chart: ChartComponent;

  
  
  name:string;

  date_list:string[]=[];
  req_list:number[]=[];
  staff_list:number[]=[];
  type_list:string[]=[];
  number_list:number[]=[];
 
  constructor(private router:Router, private routerInfo:ActivatedRoute, private service:MainService) {
    this.name= this.routerInfo.snapshot.queryParams['university'];
    this.heading = this.name
    console.log(this.name);
    // this.number_list.pop()
    // this.type_list.pop()
    this.service.getIBMUniversityDetailInfo(this.name).pipe(map((req:any)=>{
      console.log(req);
      if(req){
        var i=0;
        
        for(i;i<req.type.length;i++){
          this.type_list = this.type_list.concat(req.type[i].type);
          this.number_list = this.number_list.concat(req.type[i].number);
        }
        i=0;
        for(i;i<req.result.length;i++){
          this.date_list = this.date_list.concat(req.result[i].date);
          this.req_list = this.req_list.concat(req.result[i].request);
          this.staff_list = this.staff_list.concat(req.result[i].users);
        }
        i = 0;
        this.date_list.map((date:string)=>{
          date=date.slice(0,10).toString().replace(/-/g, '/')
          date=date.slice(5,10).toString().concat('/').concat(date.slice(0,4).toString());
          this.date_list[i]=date;
          i++;
        })
        console.log(this.date_list)
        console.log(this.number_list)
      }
      
  }
  )).subscribe(post=>{
    this.type_list = this.type_list.concat([]);
     this.number_list.map((num)=>{
       num.toFixed(1);
     })
    //console.log(this.date)
   })

  
  }

}
