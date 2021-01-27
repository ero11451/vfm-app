import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotelistPageRoutingModule } from './notelist-routing.module';

import { NotelistPage } from './notelist.page';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotelistPageRoutingModule,
    NgPipesModule,
  ],
  declarations: [NotelistPage]
})
export class NotelistPageModule {}
