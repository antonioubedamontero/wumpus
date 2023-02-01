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

  advanceHeroInBoard(heroParam: Hero): HeroWithFeedBack {
    // TODO: Pending implemmentation
    const hero = { ...heroParam };
    const feedbackMessages: string[] = [];
    const cantAdvance = 'No puedo avanzar. Hay un muro';

    switch (heroParam.orientation) {
      case 'N':
        if (heroParam.row - 1 >= 0) {
          hero.row = heroParam.row - 1;
          this.board[heroParam.row][heroParam.col].hasHero = false;
          this.board[heroParam.row - 1][heroParam.col].hasHero = true;
        } else {
          feedbackMessages.push(cantAdvance);
        }
        break;
      case 'S':
        if (heroParam.row + 1 < this.size) {
          hero.row = heroParam.row + 1;
          this.board[heroParam.row][heroParam.col].hasHero = false;
          this.board[heroParam.row + 1][heroParam.col].hasHero = true;
        } else {
          feedbackMessages.push(cantAdvance);
        }
        break;
      case 'E':
        if (heroParam.col + 1 < this.size) {
          hero.col = heroParam.col + 1;
          this.board[heroParam.row][heroParam.col].hasHero = false;
          this.board[heroParam.row][heroParam.col + 1].hasHero = true;
        } else {
          feedbackMessages.push(cantAdvance);
        }
        break;
      case 'W':
        if (heroParam.col - 1 >= 0) {
          hero.col = heroParam.col - 1;
          this.board[heroParam.row][heroParam.col].hasHero = false;
          this.board[heroParam.row][heroParam.col - 1].hasHero = true;
        } else {
          feedbackMessages.push(cantAdvance);
        }
        break;
      default:
        throw new Error('Movement not defined');
    }

    return { hero, feedbackMessages };
  }

  heroAttacks(hero: Hero): void {
    // TODO: Pending implementation
  }
}
