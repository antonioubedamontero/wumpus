import { Component, OnInit } from '@angular/core';
import { MovementResponse, Hero } from '../../interfaces/index';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  hero: Hero;
  feedbackMessages: string[] = [];

  constructor(private gameService: GameService) {
    this.hero = { orientation: 'None', hasGold: false, row: -1, col: -1 };

    // TODO: Temporal, remove later
    this.gameService.createGame(4, 1);
  }

  ngOnInit(): void {
  }

  receiveMovement(movementResponse: MovementResponse): void {
    if (this.hero.orientation === 'None' && movementResponse.additionalAction !== 'exitEnter') {
      return;
    }

    if (movementResponse.additionalAction === 'exitEnter' && this.hero.orientation === 'None') {
      this.hero = this.gameService.getHeroIntoBoard(this.hero);
      return;
    }

    if (movementResponse.additionalAction === 'exitEnter' && this.hero.hasGold) {
      this.hero = this.gameService.getHeroOutOfBoard(this.hero);

      // TODO: Pending can go out when has gold
      return;
    }

    if (!movementResponse.additionalAction) {
      this.hero.orientation = movementResponse.orientation;
      this.feedbackMessages = [];
      return;
    }

    if (movementResponse.additionalAction === 'goForward') {
      const { hero, feedbackMessages, isHeroAlive } = this.gameService.advanceHeroInBoard(this.hero);
      this.hero = hero;
      this.feedbackMessages = feedbackMessages;
      console.log(`Is live? ${isHeroAlive}`);
      return;
    }
  }

  get canExitEnter(): boolean {
    return (this.hero.row === -1 && this.hero.col === -1) ||
      (this.hero.hasGold && this.hero.row === this.gameService.size - 1 && this.hero.col === 0);
  }
}
