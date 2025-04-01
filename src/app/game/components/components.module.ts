import { BaseModule } from './../../base/base.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board/board.component';
import { ControlsComponent } from './controls/controls.component';
import { FinishModalComponent } from './finish-modal/finish-modal.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    BoardComponent,
    ControlsComponent,
    FinishModalComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    PipesModule
  ],
  exports: [
    BoardComponent,
    ControlsComponent,
    FinishModalComponent
  ]
})
export class ComponentsModule { }
