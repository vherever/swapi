import {Component, OnInit, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import {Person} from '../models/person';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  @Input() items: Array<Person>;

  public enableFilter: boolean;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();

  constructor(
    private router: Router
  ) {}

  public onItemClick(item) {
    const id = item.key;
    this.router.navigate(['/people', id]);
  }

  ngOnInit() {
    this.enableFilter = true;
    this.filterText = '';
    this.filterPlaceholder = 'Filter..';

    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
        this.filterText = term;
      });
  }

}
