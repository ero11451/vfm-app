import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoundingPageRoutingModule } from './founding-routing.module';

import { FoundingPage } from './founding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoundingPageRoutingModule
  ],
  declarations: [FoundingPage]
})
export class FoundingPageModule {}
