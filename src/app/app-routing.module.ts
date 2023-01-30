import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigPageComponent } from './pages/config-page/config-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LostPageComponent } from './pages/lost-page/lost-page.component';
import { WinPageComponent } from './pages/win-page/win-page.component';

const routes: Routes = [
  { path: 'config', component: ConfigPageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'lost', component: LostPageComponent },
  { path: 'win', component: WinPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'config' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
