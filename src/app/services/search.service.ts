import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Person } from '../models/person';

@Injectable()
export class SearchService {

  private requests: Subject<string>;
  private results: any[] = [];
  private _items: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  // We will subscribe to items in our component
  public items: Observable<Array<any>>;

  constructor(private http: HttpClient) {
    this.items = this._items.asObservable();
  }

  // Call it from component
  public loadPeople() {
    this.results = [];
    this.requests = new Subject();
    this.requests.asObservable().subscribe((url) => this.sendRequest(url), null, () => this.completeRequest());
    this.requests.next('https://swapi.co/api/people/');
  }

  private sendRequest(url: string) {
    this.http.get(url)
      .subscribe((res: any) => {
        this.saveResults(res.results);
        if (res.next) {
          this.requests.next(res.next);
        } else {
          this.requests.complete();
        }
      });
  }

  private saveResults(data: any[]) {
    this.results = this.results.concat(
      data.map(item => {
        return new Person(
          item.name,
          item.films
        );
      })
    );
  }

  private completeRequest() {
    this._items.next(this.results);
  }

}
