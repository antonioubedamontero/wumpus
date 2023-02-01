import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateDirectionPipe } from './translate-direction.pipe';

@NgModule({
  declarations: [
    TranslateDirectionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TranslateDirectionPipe
  ]
})
export class PipesModule { }
