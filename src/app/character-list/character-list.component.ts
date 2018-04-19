import {Component, OnInit, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import {Person} from '../models/person';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  @Input() items: Array<Person>;

  public filterText: string;

  constructor(
    private router: Router,
    private helperService: HelperService
  ) {}

  public onItemClick(item): void {
    const id = item.key;
    this.router.navigate(['/people', id]);
  }

  // Set active for current person
  private setActiveFlag(id): void {
    const result = this.items.filter((i) => {
      return i.key === parseInt(id, null);
    });
    setTimeout(() => {
      result[0].active = true;
    }, 10);
  }

  onNotifyFilter(message: string): void {
    this.filterText = message;
  }

  ngOnInit() {
    this.helperService.changeEmitted$.subscribe((id: number) => {
      if (id) {
        this.setActiveFlag(id);
      }
    });
  }

}
