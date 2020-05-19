import {Component, OnInit} from '@angular/core';

import { NewRequestService } from 'src/app/services/new-request.service';
import {NgForm} from '@angular/forms';
import {FormControl} from "@angular/forms"
//import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sticky-headers',
  templateUrl: './sticky-headers.component.html',
  styles: [],
  providers:[NewRequestService]
})
export class StickyHeadersComponent implements OnInit {
  
  // end = {hour: 0, minute: 0, second:0};
  // start = {hour: 0, minute: 0};
  // heading = 'Request Detail';
  // subheading = 'You can see request detail here.';
  // icon = 'lnr-map text-info';
  // state:string;
  // first_name:string;
  // family_name:string;
  username;
  // phone:number;
  // job_title:string;
  // university:string;
  // date: Date;
  // participant:number;
  // type:string;
  // topic:string;
  // address1:string;
  // address2:string;
  // address3:string;
  // postcode:string;
  // city:string;
  // town:string;
  isFull:boolean = true;
  constructor(private service: NewRequestService, private router:Router) {
    this.username = localStorage.getItem('username');
  }

  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 12) {
      return {tooEarly: true};
    }

    if (value.hour > 13) {
      return {tooLate: true};
    }

    return null;
  });

  ngOnInit() {
  }


  onSubmit(f: NgForm) {
    //check if all required input are filled in
    this.isFull = f.valid
    if(!this.isFull){
      return
    }
    //form object to be sent to the server, the data is readed by f.value
    var form = {
      state: "pending",
      first_name: f.value.first_name, 
      family_name: f.value.family_name,
      username:this.username,
      job_title : f.value.job_name,
      university: f.value.university,
      phone: f.value.phone,
      date: f.value.dp,
      start: f.value.start,
      //calculate end time
      end: {hour:f.value.start.hour+f.value.time.hour,minute:f.value.start.minute+f.value.time.minute,second:0},
      participant : f.value.participant,
      type : f.value.event_type, 
      topic: f.value.topic,
      address1 : f.value.address1,
      address2 : f.value.address2,
      address3 : f.value.address3,
      postcode : f.value.postcode,
      city : f.value.city,
      town : f.value.town
    }
    // submit form to server
    this.service.submitForm(form);
    //navigate back
    this.router.navigateByUrl('/dashboard/requests');
  }

  submit(){}


  
}
