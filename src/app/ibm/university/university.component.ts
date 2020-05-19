import {Component, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ChartComponent} from 'ng-apexcharts';
import { MainService } from 'src/app/services/main.service';
import {map} from "rxjs/operators"
import { Router } from "@angular/router";

@Component({
  selector: 'ibm-app-university',
  templateUrl: './university.component.html',
  styles: []
})
export class IBMUniversityComponent {
  heading = 'University';
  subheading = 'You can view university details here.';
  icon = 'pe-7s-graph2 icon-gradient bg-happy-green';

  @ViewChild('chart') chart: ChartComponent;

  //form: FormGroup;
  private date_list:string[]=[];
  private uni_list:string[]=[];
  private date_req:number[]=[0];
  private uni_req:number[]=[0];
  constructor(private service:MainService, private router:Router) {
    this.service.getIBMUniversityInfo().pipe(map((req:any)=>{
        console.log(req);
        this.date_req.pop()
      
        this.uni_req.pop()
        var i=0;
        
        for(i;i<req.date.length;i++){
          this.date_list = this.date_list.concat(req.date[i].date);
          this.date_req = this.date_req.concat(req.date[i].req_num);
        }
        i=0
        for(i;i<req.university.length;i++){
          this.uni_list = this.uni_list.concat(req.university[i].university);
          this.uni_req = this.uni_req.concat(req.university[i].req_num);
        }
        i = 0;
        this.date_list.map((date:string)=>{
          date=date.slice(0,10).toString().replace(/-/g, '/')
          date=date.slice(5,10).toString().concat('/').concat(date.slice(0,4).toString());
          this.date_list[i]=date;
          i++;
        })
        console.log(this.date_list);
        console.log(this.date_req);
    }
    )).subscribe(post=>{
      console.log('post');
      console.log(post);
      
      //console.log(this.date)
     })

    
  }

}
