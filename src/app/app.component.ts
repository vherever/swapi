import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'SWAPI';
  public items: any[];

  constructor(private searchService: SearchService) {

    this.items = [];
  }

  ngOnInit() {
    this.searchService.loadPeople();
    this.searchService.items.subscribe((items) => this.items = items);
  }
}
