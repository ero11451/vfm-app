import { WalletPage } from '../wallet/wallet.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CelebrationcardPageRoutingModule } from './celebrationcard-routing.module';

import { CelebrationcardPage } from './celebrationcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CelebrationcardPageRoutingModule,
  ],
  declarations: [CelebrationcardPage]
})
export class CelebrationcardPageModule {}
