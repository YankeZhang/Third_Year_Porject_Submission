import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RequestService} from './demo/request.service';
import {Request} from './demo/request';
import {NgbdSortableHeaderDirective,SortEvent} from 'src/app/DemoPages/Tables/dynamic/demo/sortable.directive';
import { ActivatedRoute } from '@angular/router';
// @ts-ignore
@Component({
  selector: 'ibm-uni-app-requests',
  templateUrl: './requests.component.html',
  providers: [RequestService, DecimalPipe]
})
export class IBMUniRequestsComponent {

  heading = 'Requests';
  subheading = 'You can view all requests here.';
  icon = 'pe-7s-notebook icon-gradient bg-mixed-hopes';

  requests$: Observable<Request[]>;
  total$: Observable<number>;

  // @ts-ignore
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  req: Request[] = [];
  id_list: number[]=[];
  real_id_list: number[] = [];
  private name:string;
  constructor(public service: RequestService, private routerInfo:ActivatedRoute) {
    this.name= this.routerInfo.snapshot.queryParams['university'];
    this.service.getAllPosts(this.name).pipe(map((req: Array<any>) => {
      console.log('uni active')
      
      if (req) {
        var i = 1;
        console.log(req)
        req.forEach((erg) => {
          var real_id = erg.req_id
          this.real_id_list.push(erg.req_id)
          erg.req_id = i;
          this.id_list.push(erg.req_id);
          erg.date=erg.date.slice(0,10).toString();
          var full_name = erg.first_name.toString()+' '+erg.family_name.toString()
          this.service.req.push({id:erg.req_id,real_id:real_id, date:erg.date, name:full_name,university:erg.university,type: erg.type, topic:erg.topic, state: erg.state});
          i++;
        });
      }
      console.log('result')
      console.log(this.req)
       // <<<=== missing return
    })).subscribe(post=>{
    })
    this.requests$ = service.requests$;
    this.total$ = service.total$;
  }

  refresh(){
    
    this.service.getAllPosts(this.name).pipe(map((req: Array<any>) => {
      
      if (req) {
        this.service.req=[];
        var i = 1;
        console.log(req)
        req.forEach((erg) => {
          var real_id = erg.req_id
          this.real_id_list.push(erg.req_id)
          erg.req_id = i;
          this.id_list.push(erg.req_id);
          erg.date=erg.date.slice(0,10).toString();
          var full_name = erg.first_name.toString()+' '+erg.family_name.toString()
          this.service.req.push({id:erg.req_id,real_id:real_id,date:erg.date, name:full_name,university:erg.university,type: erg.type, topic:erg.topic, state: erg.state});
          i++;
        });
      }
      console.log('result')
      console.log(this.req)
       // <<<=== missing return
    })).subscribe(post=>{
    })
    this.onSort({column:'Date', direction:''});
  }
  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
