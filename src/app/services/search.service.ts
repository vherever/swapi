import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Person } from '../models/person';

@Injectable()
export class SearchService {
  private key: number;
  private requests: Subject<string>;
  private results: any[] = [];
  private _items: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<Person>>([]);

  // We will subscribe to items in our component
  public items: Observable<Array<Person>>;

  constructor(private http: HttpClient) {
    this.items = this._items.asObservable();
  }

  // Call it from component
  public loadPeople() {
    this.results = [];
    this.key = 1;
    this.requests = new Subject();
    this.requests.asObservable().subscribe((url) => this.sendRequest(url), null, () => this.completeRequest());
    this.requests.next('https://swapi.co/api/people/');
  }

  public getPerson(id: number) {
    const subject = new BehaviorSubject<Person>(undefined);
    this.items.subscribe((res: Array<Person>) => {
      const result = res.filter((obj, key) => {
        return key === id - 1;
      });
      console.log('result', result[0]);
      subject.next(result[0]);
    });
    return subject;
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

  private saveResults(data: Person[]) {
    this.results = this.results.concat(
      data.map(item => {
        return new Person(
          this.key ++,
          item.name,
          item.films,
          item.starships,
          item.birth_year
        );
      })
    );
  }

  private completeRequest() {
    this._items.next(this.results);
  }

}
