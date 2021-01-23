import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicemenuPage } from './servicemenu.page';

const routes: Routes = [
  {
    path: '',
    component: ServicemenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicemenuPageRoutingModule {}
