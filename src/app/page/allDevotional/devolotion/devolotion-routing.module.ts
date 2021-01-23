import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevolotionPage } from './devolotion.page';

const routes: Routes = [
  {
    path: '',
    component: DevolotionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevolotionPageRoutingModule {}
