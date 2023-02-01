import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPageComponent } from './config-page/config-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { WinPageComponent } from './win-page/win-page.component';
import { LostPageComponent } from './lost-page/lost-page.component';
import { ComponentsModule } from '../components/components.module';
import { BaseModule } from '../base/base.module';

@NgModule({
  declarations: [
    ConfigPageComponent,
    GamePageComponent,
    WinPageComponent,
    LostPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BaseModule
  ],
  exports: [
    ConfigPageComponent,
    GamePageComponent,
    WinPageComponent,
    LostPageComponent
  ]
})
export class PagesModule { }
