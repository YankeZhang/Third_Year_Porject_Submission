import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Request} from './request';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from 'src/app/DemoPages/Tables/dynamic/demo/sortable.directive';
import { HttpClient } from '@angular/common/http';
interface SearchResult {
  requests: Request[];
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

function sort(requests: Request[], column: string, direction: string): Request[] {
  if (direction === '') {
    return requests;
  } else {
    return [...requests].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}



function matches(Request: Request, term: string, pipe: PipeTransform) {
  return Request.date.toLowerCase().includes(term)
    || pipe.transform(Request.name).includes(term)
    || pipe.transform(Request.university).includes(term)
    || pipe.transform(Request.type).includes(term)
    || pipe.transform(Request.topic).includes(term)
    || pipe.transform(Request.state).includes(term);
}

@Injectable({providedIn: 'root'})
export class RequestService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _REQUESTS$ = new BehaviorSubject<Request[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  req : Request[] = [];
  constructor(private pipe: DecimalPipe, private http: HttpClient ) {
   
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._REQUESTS$.next(result.requests);
      this._total$.next(result.total);
    });

    this._search$.next();
    
      // .subscribe(req => this.req = req);
  }

  
  setReq(req){
    this.req = req;
  }

  getAllPosts(): Observable<any> {
    
    return this.http.get('http://localhost:4600/ibm/requests')
    
  };
  
  get requests$() { return this._REQUESTS$.asObservable(); }
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

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    // 1. sort
    let requests = sort(this.req, sortColumn, sortDirection);
    // 2. filter
    //console.log(requests)
    requests = requests.filter(Request => matches(Request, searchTerm, this.pipe));
    const total = requests.length;
    // 3. paginate
    requests = requests.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({requests, total});
  }
}