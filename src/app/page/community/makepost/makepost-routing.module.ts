import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakepostPage } from './makepost.page';

const routes: Routes = [
  {
    path: '',
    component: MakepostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakepostPageRoutingModule {}
