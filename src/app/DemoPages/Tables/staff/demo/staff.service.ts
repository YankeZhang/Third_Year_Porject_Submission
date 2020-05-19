import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Staff} from './staff';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from './sortable.directive';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
interface SearchResult {
  staffs: Staff[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(staffs: Staff[], column: string, direction: string): Staff[] {
  if (direction === '') {
    return staffs;
  } else {
    return [...staffs].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(Staff: Staff, term: string, pipe: PipeTransform) {
  return Staff.name.toLowerCase().includes(term)
  || pipe.transform(Staff.name).includes(term)
    || pipe.transform(Staff.university).includes(term)
    || pipe.transform(Staff.job_title).includes(term)
    || pipe.transform(Staff.email).includes(term)
    || pipe.transform(Staff.phone).includes(term)
    || pipe.transform(Staff.total).includes(term);
}

@Injectable({providedIn: 'root'})
export class StaffService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _staffs$ = new BehaviorSubject<Staff[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  staffs: Staff[] = [];
  constructor(private pipe: DecimalPipe, private http:HttpClient) {


    this.getAllPosts().pipe(map((req: Array<any>) => {
      
      if (req) {
        var i = 1;
        console.log(req)
        req.forEach((erg) => {
          var name = erg.first_name.toString()+' '+erg.family_name.toString()
          this.staffs.push({id:i, name:name, university:erg.university, job_title:erg.job_title, email:erg.email,phone:erg.phone,total:erg.request});
          i++;
        });
      }
      console.log('result')
      console.log(this.staffs)
      
    })).subscribe(post=>{
    })

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._staffs$.next(result.staffs);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get staffs$() { return this._staffs$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  getAllPosts(): Observable<any> {
  
    return this.http.get('http://localhost:4600/ibm/table/staff')
    
  };
  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort

    let staffs = sort(this.staffs, sortColumn, sortDirection);

    // 2. filter
    staffs = staffs.filter(Staff => matches(Staff, searchTerm, this.pipe));
    const total = staffs.length;

    // 3. paginate
    staffs = staffs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({staffs, total});
  }
}
