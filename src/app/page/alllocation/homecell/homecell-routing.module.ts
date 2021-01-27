import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomecellPage } from './homecell.page';

const routes: Routes = [
  {
    path: '',
    component: HomecellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomecellPageRoutingModule {}
