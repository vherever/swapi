import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterListComponent } from './character-list/character-list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent
  },
  {
    path: 'people',
    component: CharacterListComponent
  },
  {
    path: 'people/:id',
    component: DetailsComponent
  },
  {
    path: '**',
    redirectTo: 'people'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
