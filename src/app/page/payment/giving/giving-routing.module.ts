import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GivingPage } from './giving.page';

const routes: Routes = [
  {
    path: '',
    component: GivingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GivingPageRoutingModule {}
