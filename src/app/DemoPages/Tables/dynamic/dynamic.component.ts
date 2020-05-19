import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {Observable} from 'rxjs';
import {UniversityService} from './demo/country.service';
import {University} from './demo/country';
import {NgbdSortableHeaderDirective, SortEvent} from './demo/sortable.directive';

import {map} from "rxjs/operators"
import { Router } from '@angular/router';

import{ActivatedRoute,Params} from  '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  providers: [UniversityService, DecimalPipe]
})
export class DynamicComponent {

  heading = 'Dynamic Tables';
  subheading = 'Basic example of Angular 7 table with sort, search and filter functionality.';
  icon = 'pe-7s-notebook icon-gradient bg-mixed-hopes';

  universities$: Observable<University[]>;
  total$: Observable<number>;

  // @ts-ignore
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  private id_list:string[];
  constructor(public service: UniversityService, private router:Router) {
   
    // this.service.getAllPosts().pipe(map((req: Array<any>) => {
      
    //   if (req) {
    //     var i = 1;
    //     console.log(req)
    //     req.forEach((erg) => {
          
    //       this.service.university.push({id:i, university:erg.university, total:erg.request, users:erg.users});
    //       i++;
    //     });
    //   }
    //   console.log('result')
    //   console.log(this.service.university)
      
    // })).subscribe(post=>{
    // })
    this.universities$ = service.universities$;
    this.total$ = service.total$;
    
  }
  refresh(){
    this.onSort({column:'university', direction:'asc'});
  }

  seeDetail(university:string){
    this.router.navigate(['/ibm/university-detail'],{queryParams: {
      university:university
    }})
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
