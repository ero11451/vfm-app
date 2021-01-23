import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentlistPageRoutingModule } from './paymentlist-routing.module';

import { PaymentlistPage } from './paymentlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentlistPageRoutingModule
  ],
  declarations: [PaymentlistPage]
})
export class PaymentlistPageModule {}
