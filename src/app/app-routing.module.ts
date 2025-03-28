import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamePageGuard } from './guards/game-page.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'config'
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config-page.module').then(m => m.ConfigPageModule)
  },
  {
    path: 'game',
    canActivate: [GamePageGuard],
    canLoad: [GamePageGuard],
    loadChildren: () => import('./game/game-page.module').then(m => m.GamePageModule)
  },
  {
    path: '**',
    redirectTo: '/config'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
