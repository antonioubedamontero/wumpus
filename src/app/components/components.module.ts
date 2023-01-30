import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
  declarations: [
    ControlsComponent
  ],
  imports: [
    CommonModule,
    BaseModule
  ],
  exports: [
    ControlsComponent
  ]
})
export class ComponentsModule { }
