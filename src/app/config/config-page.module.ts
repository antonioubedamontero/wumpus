import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from 'src/app/base/base.module';
import { ConfigPageComponent } from './pages/config-page.component';
import { ConfigPageRoutingModule } from './config-page-routing.module';

@NgModule({
  declarations: [
    ConfigPageComponent
  ],
  imports: [
    BaseModule,
    CommonModule,
    ConfigPageRoutingModule,
  ]
})
export class ConfigPageModule { }
