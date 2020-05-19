import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../../theme-options';
import { Router } from '@angular/router';
import {UserService} from '../../../../../../services/user.service';
import {map} from "rxjs/operators"
@Component({
  selector: 'ibm-app-user-box',
  templateUrl: './user-box.component.html',
})
export class IBMUserBoxComponent implements OnInit {
  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  private name:string;
  private job:string;
  constructor(public globals: ThemeOptions, private router:Router, private service:UserService) {
    console.log('user box created')
    this.service.getIBMUserInfo(localStorage.getItem('username')).pipe(map((req:any)=>{
      
      if (req) {
        console.log(req);
        this.name=req[0].first_name.toString()+' '+req[0].family_name.toString();
        this.job = req[0].job_title;
        console.log(this.name);
        
        // this.totalMember = this.user_num[this.user_num.length-1]
        // this.universities = this.uni_num[this.uni_num.length-1]
          
      }
    }
    )).subscribe(post=>{
      
     })
    
  }

  ngOnInit() {
    
  }
  
  ngOnDestroy(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/login');
  }

}
