import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';
import { BoardComponent } from './board/board.component';
import { ControlsComponent } from './controls/controls.component';
import { PipesModule } from '../pipes/pipes.module';
import { FinishModalComponent } from './finish-modal/finish-modal.component';

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
