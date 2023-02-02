import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigPageComponent } from './pages/config-page/config-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';

const routes: Routes = [
  { path: 'config', component: ConfigPageComponent },
  { path: 'game', component: GamePageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'game' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
