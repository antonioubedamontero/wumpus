import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';

import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root'
})
export class GamePageGuard implements CanActivate, CanLoad {

  constructor(private readonly router: Router, private readonly gameService: GameService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.validateRoute();
  }

  canLoad(route: Route): boolean {
    return this.validateRoute();
  }

  private validateRoute(): boolean {
    if (this.gameService.size > 0) {
      return true;
    }

    this.router.navigateByUrl('/config');
    return false;
  }
}
