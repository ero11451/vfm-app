import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessgaelistPage } from './messgaelist.page';

const routes: Routes = [
  {
    path: '',
    component: MessgaelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessgaelistPageRoutingModule {}
