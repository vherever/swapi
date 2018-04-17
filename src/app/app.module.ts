import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { FilterPipe } from './pipes/filter.pipe';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { DetailsComponent } from './details/details.component';
import {HelperService} from './services/helper.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    CharacterListComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SearchService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
