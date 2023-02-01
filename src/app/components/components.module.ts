import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';
import { BoardComponent } from './board/board.component';
import { ControlsComponent } from './controls/controls.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    BoardComponent,
    ControlsComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    PipesModule
  ],
  exports: [
    BoardComponent,
    ControlsComponent
  ]
})
export class ComponentsModule { }
