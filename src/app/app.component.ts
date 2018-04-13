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
  public loading: boolean;

  constructor(private searchService: SearchService) {
    this.items = [];
    this.loading = false;
  }

  ngOnInit() {
    this.loading = true;
    this.searchService.loadPeople();
    this.searchService.items.subscribe((items) => {
      this.items = items;
      console.log('items', this.items);
      this.loading = !this.items.length;
    });
  }
}
