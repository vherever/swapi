import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {SearchService} from '../services/search.service';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public info: any; // Person information

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchService.getPerson(params.id).subscribe((data) => {
        this.info = data;
        this.helperService.emitChange(params.id);
      });
    });
  }

}
