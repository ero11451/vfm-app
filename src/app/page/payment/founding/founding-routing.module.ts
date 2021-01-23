import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoundingPage } from './founding.page';

const routes: Routes = [
  {
    path: '',
    component: FoundingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundingPageRoutingModule {}
