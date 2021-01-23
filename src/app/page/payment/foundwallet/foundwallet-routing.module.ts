import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoundwalletPage } from './foundwallet.page';

const routes: Routes = [
  {
    path: '',
    component: FoundwalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundwalletPageRoutingModule {}
