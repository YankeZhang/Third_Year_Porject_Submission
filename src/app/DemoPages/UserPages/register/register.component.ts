import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: false,
  };
  private isFull:boolean=true;
  private isSame:boolean=true;
  private validEmail:boolean=true;
  constructor(private service:LoginService, private router:Router) {

  }

  onSubmit(f: NgForm) {
    this.validEmail = true;
    this.isFull = f.valid
    this.isSame = f.value.password==f.value.passwordrep
    console.log(f.value)
    console.log(f.valid)
    if(!this.isFull){
      return
    }
    if(!this.isSame){
      return
    }
    
   

    
    
    var form = f.value
    // console.log(form[0])
    this.service.register(form).subscribe((data:any) => {
      console.log(data)
      this.router.navigateByUrl('/login');
    },
    error => {
      this.validEmail = false;
      console.error(error);
    })
    
    //this.router.navigateByUrl('/dashboard/requests');
  }

  ngOnInit() {
  }

}
