import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploaddevotionalPageRoutingModule } from './uploaddevotional-routing.module';

import { UploaddevotionalPage } from './uploaddevotional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploaddevotionalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UploaddevotionalPage]
})
export class UploaddevotionalPageModule {}
