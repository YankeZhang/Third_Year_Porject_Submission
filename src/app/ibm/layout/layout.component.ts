import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import {PdfService} from '../../services/pdf.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
//import {FormControl} from "@angular/forms"


declare const readDocument: any;
declare const saveDocument: any;
@Component({
  selector: 'app-pdf',
  templateUrl:'./pdf.component.html'
})
export class PdfComponent implements OnInit {
  pdfSrc = "./pdf-test.pdf"

  heading = 'Report';
  subheading = 'You can generate report here.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';



  
  totalMember:number;
  
  lecture:number=0;
  student_support:number=0;
  hachathon:number=0;
  general_events:number=0;

  total:number=0;
  
  username: string;
  date = [];
  private req_num:number[] = [];
  private user_num:number[] = [];
  uni_num:number[] = [];
  
  uni_list:string[] = ['Any'];
  uni_staff_list:{}[] = [{first_name:'Any',family_name:''}];
  ibm_staff_list:string[] = ['Any'];
 
  date_dic=[
    {key:'in 1 week', value:7}, 
    {key:'in 1 month', value:30},
    {key:'in 3 months', value:90},
    {key:'in 6 months', value:180},
    {key:'in 1 year', value:365}
  ]

  response(req){
    if (req) {
      console.log(req)
      var i=0
      //console.log(req.request[0].date);
      for(i;i<req.request.length;i++){
         
        this.date.push(req.request[i].date);
        this.req_num=this.req_num.concat([req.request[i].req_num]);
        this.user_num = this.user_num.concat([req.request[i].user_num]);
        this.uni_num = this.uni_num.concat([req.request[i].uni_num]);
        
      }
      this.totalMember = this.user_num[this.user_num.length-1]
      
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
      i=0
      for(i;i<req.university.length;i++){
        this.uni_list=this.uni_list.concat([req.university[i].university])
      }
      i=0
      for(i;i<req.university_staff.length;i++){
        this.uni_staff_list=this.uni_staff_list.concat([req.university_staff[i]])
      }
      console.log(this.uni_staff_list)
      i=0
      for(i;i<req.ibm_staff.length;i++){
        this.ibm_staff_list=this.ibm_staff_list.concat([req.ibm_staff[i].ibm_staff])
      }
      
      
      
    }
  }

  receiveData(){
    this.service.getDatawithPara(this.username).pipe(map((req:any)=>{
      this.response(req);
    }
    )).subscribe(post=>{
      //console.log(this.req_num);
      var i = 0;
      this.date.map((date:string)=>{
        date=date.slice(0,10).toString().replace(/-/g, '/')
        this.date[i]=date;
        i++;
      })
      //console.log(this.date)
     })
    
  }

  constructor(public service: PdfService, private router: Router) {
    this.username = localStorage.getItem('username');
    this.receiveData()
    // this.service.getDatawithPara(this.username).pipe(map((req:any)=>{
    //   this.receiveData()
    // }
    // )).subscribe(post=>{
    //   //console.log(this.req_num);
    //   var i = 0;
    //   this.date.map((date:string)=>{
    //     date=date.slice(0,10).toString().replace(/-/g, '/')
    //     this.date[i]=date;
    //     i++;
    //   })
    //   //console.log(this.date)
    //  })
  }


  ngOnInit() {
    console.log(this.dateChange(1, false))
  }

  dateChange(num ,date) {
        num=1, date = false;
    　　if (!date) {
    　　　　date = new Date();
    　　　　date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    　　}
    　　date += " 00:00:00";
    　　date = Date.parse(new Date(date).toString())/1000;
    　　date += (86400) * num;//修改后的时间戳
    　　var newDate = new Date(parseInt(date) * 1000);
    　　return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
  }

  onChangeLoad(event: any) {
    readDocument(event);
  }

  onClickSave() {
    saveDocument();
  }
page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  
  readonly dpiRatio = 96 / 72;
  
  onFileSelected() {
    let $img: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        console.log(this.pdfSrc);
      };
      
      reader.readAsArrayBuffer($img.files[0]);
    }
  }

  
  @ViewChild('content') content: ElementRef;

  makePdf() { 
    //get html element to be print
    html2canvas(document.querySelector("#content")).then(canvas => {
      //parse to png
        const imgData = canvas.toDataURL('image/png');
        //create a new pdf object
        const pdf = new jsPDF(
          'p','pt','a4'
        );
        //Let it load the image property
        const imgProps= pdf.getImageProperties(imgData);
        //set pdf size
        const pdfWidth = (pdf.internal.pageSize.getWidth());
        const pdfHeight = ((imgProps.height * pdfWidth) / imgProps.width);
        pdf.addImage(imgData, 'PNG', -10, 10, pdfWidth+20, pdfHeight+20);
        //download it
        pdf.save('Report.pdf');
    });
  }

 

  onSubmit(f: NgForm) {
  console.log(f.value.uni_staff)
      var temp:string[] = f.value.uni_staff.split(',')
      
      
      
      
    
      if(temp.length<2){
        temp=['Any','']
      }
    console.log(f.value)
    f.value.uni_staff={first_name:temp[0], family_name:temp[1]}
   
    this.service.requestPdfData(f.value).subscribe((data:any) => {
      console.log(data)
      this.date = [];
      this.req_num = [];
     this. user_num= [];
      this.uni_num= [];
      this.lecture=0;
      this.student_support=0;
      this.hachathon=0;
      this.general_events=0;
    
      this.total=0;
      
  this.uni_list= ['Any'];
  this.uni_staff_list= [{first_name:'Any',family_name:''}];
  this.ibm_staff_list = ['Any'];
      this.response(data)
      f.value.uni_staff=temp[0]+','+temp[1]
      //this.router.navigateByUrl('/login');
    },
    error => {
      f.value.uni_staff=temp[0]+','+temp[1]
      console.error(error);
    })

}}
