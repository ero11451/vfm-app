import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubcriptionPage } from './subcription.page';

const routes: Routes = [
  {
    path: '',
    component: SubcriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcriptionPageRoutingModule {}
