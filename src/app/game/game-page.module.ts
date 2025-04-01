import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';
import { ComponentsModule } from './components/components.module';
import { GamePageComponent } from './pages/game-page.component';
import { GamePageRoutingModule } from './game-page-routing.module';

@NgModule({
  declarations: [
    GamePageComponent,
  ],
  imports: [
    BaseModule,
    CommonModule,
    ComponentsModule,
    GamePageRoutingModule
  ]
})
export class GamePageModule { }
