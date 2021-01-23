import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentlistPage } from './paymentlist.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentlistPageRoutingModule {}
