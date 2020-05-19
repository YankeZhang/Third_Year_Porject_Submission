import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators"
import {RequestService} from './demo/request.service';
import {Request} from './demo/request';
import {NgbdSortableHeaderDirective, SortEvent} from './demo/sortable.directive';

// @ts-ignore
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  providers: [RequestService, DecimalPipe]
})
export class RequestsComponent {

  heading = 'Requests';
  subheading = 'You can view all requests here.';
  icon = 'pe-7s-notebook icon-gradient bg-mixed-hopes';

  requests$: Observable<Request[]>;
  total$: Observable<number>;
  
  // @ts-ignore
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  req: Request[] = [];
  id_list: number[]=[];
  private isEmpty = false;
  constructor(public service: RequestService) {
    this.service.getAllPosts(localStorage.getItem('username')).pipe(map((req: Array<Request>) => {
      console.log(req)
        console.log(req)
      if (req) {
        var i = 1;
        console.log(req)
        console.log(req)
        req.forEach((erg) => {
          erg.req_id = i;
          this.id_list.push(erg.req_id);
          erg.date=erg.date.slice(0,10).toString();
          var full_name = erg.first_name.toString()+' '+erg.family_name.toString()
          this.service.req.push({req_id:i,date:erg.date, name:full_name, first_name:erg.first_name, family_name:erg.family_name,university:erg.university,type: erg.type, topic:erg.topic, state: erg.state});
          i++;
        });
        if(i==1){
          this.isEmpty = true;
        }
      }  
    })).subscribe()
    
    this.requests$ = this.service.requests$;
    this.total$ = service.total$;
  
    
  }

  ngOnInit() {
    
    // this.service.getAllPosts()
    //   .map((req: Array<any>) => {
    //     let result:Request[] = [];
    //     if (req) {
    //       req.forEach((erg) => {
    //         result.push(new Request(erg.req_id,erg.date, erg.name, erg.university, erg.type, erg.topic, erg.state));
    //       });
    //     }
        
    //     this.req = result
        
    //     return result;
    //      // <<<=== missing return
    //   })
    //   .subscribe(req => this.req = req);
     
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
