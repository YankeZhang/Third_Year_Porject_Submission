import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {University} from './country';
import {map} from "rxjs/operators";
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from './sortable.directive';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  universities: University[];
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

function sort(universities: University[], column: string, direction: string): University[] {
  if (direction === '') {
    return universities;
  } else {
    return [...universities].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(University: University, term: string, pipe: PipeTransform) {
  return University.university.toLowerCase().includes(term)
    || pipe.transform(University.total).includes(term)
    || pipe.transform(University.users).includes(term);
}

@Injectable({providedIn: 'root'})
export class UniversityService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<University[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  university : University[] = [];
  constructor(private pipe: DecimalPipe, private http:HttpClient) {
    this.getAllPosts().pipe(map((req: Array<any>) => {
      
      if (req) {
        var i = 1;
        console.log(req)
        req.forEach((erg) => {
          
          this.university.push({id:i, university:erg.university, total:erg.request, users:erg.users});
          i++;
        });
      }
      console.log('result')
      console.log(this.university)
      
    })).subscribe(post=>{
    })
    this._search()
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.universities);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get universities$() { return this._countries$.asObservable(); }
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
  
    return this.http.get('http://localhost:4600/ibm/table/university')
    
  };
  private _search(): Observable<SearchResult> {
    
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let universities = sort(this.university, sortColumn, sortDirection);

    // 2. filter
    universities = universities.filter(University => matches(University, searchTerm, this.pipe));
    const total = universities.length;

    // 3. paginate
    universities = universities.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({universities, total});
  }
}
