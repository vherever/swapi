import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public info: any; // Person information

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchService.getPerson(params.id).subscribe((data) => {
        this.info = data;
      });
    });
  }

}
