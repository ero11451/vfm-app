import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploaddevotionalPage } from './uploaddevotional.page';

const routes: Routes = [
  {
    path: '',
    component: UploaddevotionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploaddevotionalPageRoutingModule {}
