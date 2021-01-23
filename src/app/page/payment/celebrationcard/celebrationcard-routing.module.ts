import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CelebrationcardPage } from './celebrationcard.page';

const routes: Routes = [
  {
    path: '',
    component: CelebrationcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CelebrationcardPageRoutingModule {}
