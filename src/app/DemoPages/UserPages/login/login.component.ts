import {Component, OnInit} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
   
  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };
  userdata = {email:''}
  private isCorrect:boolean = true;
  constructor(private service:LoginService, private router: Router) {
  }
  Login(){
    this.isCorrect = true;
    console.log(this.userdata)
    this.service.login(this.userdata).subscribe((data:any) => {
      var type = data.type;
        localStorage.setItem('token',data.token.toString());
        localStorage.setItem('username',this.userdata.email);
        if(type == 'university'){
          this.router.navigateByUrl('/dashboard/analytics');
        }
        else{
          this.router.navigateByUrl('/ibm/analytics');
        }
    },
    error => {
      this.isCorrect = false;
      console.error(error);
    })
  }
  
  keyLogin(event){
    if(event.keyCode == 13){
      this.Login()
    }
  }
  
  ngOnInit() {
  }

}
