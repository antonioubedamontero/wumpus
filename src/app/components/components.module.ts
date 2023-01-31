import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';
import { ControlsComponent } from './controls/controls.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ControlsComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    PipesModule
  ],
  exports: [
    ControlsComponent
  ]
})
export class ComponentsModule { }
