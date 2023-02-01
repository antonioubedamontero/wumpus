import { Injectable } from '@angular/core';

import { Cell, Hero, HeroWithFeedBack, Enemy } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  size: number = 0;
  wells: number = 0;
  board: Cell[][] = [];

  constructor() { }

  createGame(size: number, wells: number): void {
    this.size = size;
    this.wells = wells;

    this.createBoard(size);
    this.putCharactersInBoard('monster', 1);
    this.putCharactersInBoard('well', this.wells);
    this.putCharactersInBoard('gold', 1);
  }

  private createBoard(size: number): void {
    this.board = [];

    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      const row: Cell[] = [];
      for (let colIndex = 0; colIndex < size; colIndex++) {
        row.push({
          hasHero: false,
          hasGold: false
        });
      }
      this.board.push(row);
    }
  }

  private putCharactersInBoard(characterType: Enemy | 'gold', numOfCharacters: number): void {
    let characterIsInBoard = false;
    let requiredCharacters = numOfCharacters;
    do {
      characterIsInBoard = this.putCharacterInBoard(characterType);
      if (characterIsInBoard) {
        requiredCharacters--;
      }
    } while (requiredCharacters > 0);
  }

  private putCharacterInBoard(character: Enemy | 'gold'): boolean {
    // TODO: Review this ¿anytime in edges?
    const row = Math.floor(Math.random() * (this.size - 1));
    const col = Math.floor(Math.random() * (this.size - 1));

    if ((row === this.size - 1) && (col === 0)) {
      return false;
    }

    if (character === 'gold' && !this.board[row][col].enemies) {
      this.board[row][col].hasGold = true;
      return true;
    }

    if (!this.board[row][col].enemies && !this.board[row][col].hasGold) {
      this.board[row][col].enemies = character as Enemy;
      return true;
    }

    return false;
  }

  getBoard(): Cell[][] {
    return this.board;
  }

  getHeroIntoBoard(hero: Hero): Hero {
    hero.orientation = 'N';
    hero.row = this.size - 1;
    hero.col = 0;

    this.board[this.size - 1][0].hasHero = true;

    return hero;
  }

  getHeroOutOfBoard(hero: Hero): Hero {
    hero.orientation = 'None';

    this.board[hero.row][hero.col].hasHero = false;

    hero.row = -1;
    hero.col = -1;

    return hero;
  }

  advanceHeroInBoard(heroParam: Hero): HeroWithFeedBack {
    let heroWithFeedback: HeroWithFeedBack = {
      hero: { ...heroParam },
      feedbackMessages: [],
      isHeroAlive: true
    };
    const cantAdvance = 'No puedo avanzar. Hay un muro';

    switch (heroParam.orientation) {
      case 'N':
        const prevRow = heroParam.row - 1;
        if (prevRow >= 0) {
          heroWithFeedback.hero.row = prevRow;
          this.board[heroParam.row][heroParam.col].hasHero = false;
          this.board[prevRow][heroParam.col].hasHero = true;
          heroWithFeedback = this.getMovementReaction(heroWithFeedback.hero);
        } else {
          heroWithFeedback.feedbackMessages.push(cantAdvance);
        }
        break;
      case 'S':
        const nextRow = heroParam.row + 1;
        if (nextRow < this.size) {
          heroWithFeedback.hero.row = nextRow;
          this.board[heroParam.row][heroParam.col].hasHero = false;
          this.board[nextRow][heroParam.col].hasHero = true;
          heroWithFeedback = this.getMovementReaction(heroWithFeedback.hero);
        } else {
          heroWithFeedback.feedbackMessages.push(cantAdvance);
        }
        break;
      case 'E':
        const nextCol = heroParam.col + 1;
        if (nextCol < this.size) {
          heroWithFeedback.hero.col = nextCol;
          this.board[heroParam.row][heroParam.col].hasHero = false;
          this.board[heroParam.row][nextCol].hasHero = true;
          heroWithFeedback = this.getMovementReaction(heroWithFeedback.hero);
        } else {
          heroWithFeedback.feedbackMessages.push(cantAdvance);
        }
        break;
      case 'W':
        const prevCol = heroParam.col - 1;
        if (prevCol >= 0) {
          heroWithFeedback.hero.col = prevCol;
          this.board[heroParam.row][heroParam.col].hasHero = false;
          this.board[heroParam.row][prevCol].hasHero = true;
          heroWithFeedback = this.getMovementReaction(heroWithFeedback.hero);
        } else {
          heroWithFeedback.feedbackMessages.push(cantAdvance);
        }
        break;
      default:
        throw new Error('Movement not defined');
    }

    return heroWithFeedback;
  }

  private getMovementReaction(heroParam: Hero): HeroWithFeedBack {
    const feedbackMessages: string[] = [];
    let isHeroAlive = true;
    const hero = { ...heroParam };

    if (this.board[hero.row][hero.col].hasGold) {
      feedbackMessages.push('Puedo percibir el brillo del oro');
      hero.hasGold = true;
    }

    const boardEnemy = this.board[hero.row][hero.col].enemies;

    if (boardEnemy === 'monster') {
      feedbackMessages.push('Me ha matado el Wumpus');
      isHeroAlive = false;
    }

    if (boardEnemy === 'well') {
      feedbackMessages.push('He caído a un pozo');
      isHeroAlive = false;
    }

    return { hero, feedbackMessages, isHeroAlive };
  }

  heroAttacks(hero: Hero): void {
    // TODO: Pending implementation
  }
}
