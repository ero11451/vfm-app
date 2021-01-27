import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomecellPageRoutingModule } from './homecell-routing.module';

import { HomecellPage } from './homecell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomecellPageRoutingModule
  ],
  declarations: [HomecellPage]
})
export class HomecellPageModule {}
