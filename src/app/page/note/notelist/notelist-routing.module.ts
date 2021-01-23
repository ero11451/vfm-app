import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotelistPage } from './notelist.page';

const routes: Routes = [
  {
    path: '',
    component: NotelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotelistPageRoutingModule {}
