import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {Observable} from 'rxjs';
import {StaffService} from './demo/staff.service';
import {Staff} from './demo/staff';
import {NgbdSortableHeaderDirective, SortEvent} from './demo/sortable.directive';

// @ts-ignore
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  providers: [StaffService, DecimalPipe]
})
export class StaffComponent {

  heading = 'Dynamic Tables';
  subheading = 'Basic example of Angular 7 table with sort, search and filter functionality.';
  icon = 'pe-7s-notebook icon-gradient bg-mixed-hopes';

  staffs$: Observable<Staff[]>;
  total$: Observable<number>;

  // @ts-ignore
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  constructor(public service: StaffService) {
    this.staffs$ = service.staffs$;
    this.total$ = service.total$;
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
