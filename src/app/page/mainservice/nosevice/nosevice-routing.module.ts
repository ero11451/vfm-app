import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NosevicePage } from './nosevice.page';

const routes: Routes = [
  {
    path: '',
    component: NosevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NosevicePageRoutingModule {}
