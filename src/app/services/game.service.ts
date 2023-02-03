import { Injectable } from '@angular/core';

import { Cell, Hero, HeroWithFeedBack, Enemy, Orientation } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  size: number = 0;
  wells: number = 0;
  numOfHarrows: number = 0;

  board: Cell[][] = [];

  constructor() { }

  createGame(size: number, wells: number, numOfHarrows: number): void {
    this.size = size;
    this.wells = wells;
    this.numOfHarrows = numOfHarrows;

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
          hasGold: false,
          hasBeenVisited: false,
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
    this.board[this.size - 1][0].hasBeenVisited = true;
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
      // TODO: Refactor this code when possible
      case 'N':
        const prevRow = heroParam.row - 1;
        if (prevRow >= 0) {
          heroWithFeedback.hero.row = prevRow;
          this.board[heroParam.row][heroParam.col].hasHero = false;
          this.board[prevRow][heroParam.col].hasHero = true;
          this.board[prevRow][heroParam.col].hasBeenVisited = true;
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
          this.board[nextRow][heroParam.col].hasBeenVisited = true;
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
          this.board[heroParam.row][nextCol].hasBeenVisited = true;
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
          this.board[heroParam.row][prevCol].hasBeenVisited = true;
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
    const hero = { ...heroParam };

    const boardEnemy = this.board[hero.row][hero.col].enemies;

    // Actions that implies death of hero
    if (boardEnemy === 'monster') {
      const messages = ['Puedo percibir al Wumpus', 'Me ha matado el Wumpus'];
      return this.heroDies(hero, messages);
    }

    if (boardEnemy === 'well') {
      const messages = ['He caído a un pozo']
      return this.heroDies(hero, messages);
    }

    // get hero perceptions if any    
    return this.getHeroPerceptions(hero);
  }

  heroDies(hero: Hero, messages: string[]): HeroWithFeedBack {
    return { hero, feedbackMessages: messages, isHeroAlive: false };
  }

  getHeroPerceptions(heroParam: Hero): HeroWithFeedBack {
    const isHeroAlive = true;
    const feedbackMessages: string[] = [];
    const hero: Hero = { ...heroParam };

    const currenCell: Cell = this.board[hero.row][hero.col];

    if (currenCell.hasGold) {
      feedbackMessages.push('Puedo percibir el brillo del oro');
      hero.hasGold = true;
    }

    const windMessage = 'Puedo percibir la brisa de un pozo';
    const smellMessage = 'Puedo percibir el hedor de la bestia';

    const validAdjentPositions = this.getValidAdjacentsPositions(hero);

    validAdjentPositions.forEach((adjacentPosition: number[]) => {
      const adjacentCell: Cell = this.board[adjacentPosition[0]][adjacentPosition[1]];
      const enemies = adjacentCell.enemies;

      if (enemies === 'monster' && !feedbackMessages.includes(smellMessage)) {
        feedbackMessages.push(smellMessage);
      }

      if (enemies === 'well' && !feedbackMessages.includes(windMessage)) {
        feedbackMessages.push(windMessage);
      }
    });

    return { hero, feedbackMessages, isHeroAlive };
  }

  getValidAdjacentsPositions(hero: Hero): number[][] {
    const coordsOperation = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const validAdjacentPositions: number[][] = [];
    coordsOperation.forEach((coordOperation: number[]) => {
      const newCurrentRow = hero.row + coordOperation[0];
      const newCurrentCol = hero.col + coordOperation[1];

      if ((newCurrentRow >= 0 && newCurrentRow < this.size) && (newCurrentCol >= 0 && newCurrentCol < this.size)) {
        validAdjacentPositions.push([newCurrentRow, newCurrentCol])
      }
    });
    return validAdjacentPositions;
  }

  heroAttacks(hero: Hero, Orientation: Orientation): string[] {
    switch (Orientation) {
      case 'N':
        for (let row = hero.row; row >= 0; row--) {
          if (this.board[row][hero.col].enemies?.includes('monster')) {
            this.board[row][hero.col].enemies = undefined;
            return ['Has lanzado una flecha. Escuchas el grito del Wumpus.. Ha muerto'];
          }
        }
        break;

      case 'S':
        for (let row = hero.row; row < this.size; row++) {
          if (this.board[row][hero.col].enemies?.includes('monster')) {
            this.board[row][hero.col].enemies = undefined;
            return ['Has lanzado una flecha. Escuchas el grito del Wumpus.. Ha muerto'];
          }
        }
        break;

      case 'E':
        for (let col = hero.col; col < this.size; col++) {
          if (this.board[hero.row][col].enemies?.includes('monster')) {
            this.board[hero.row][col].enemies = undefined;
            return ['Has lanzado una flecha. Escuchas el grito del Wumpus.. Ha muerto'];
          }
        }
        break;

      case 'W':
        for (let col = hero.col; col >= 0; col--) {
          if (this.board[hero.row][col].enemies?.includes('monster')) {
            this.board[hero.row][col].enemies = undefined;
            return ['Has lanzado una flecha. Escuchas el grito del Wumpus.. Ha muerto'];
          }
        }
        break;

      default:
        throw new Error('Orientation is not defined');
    }

    return ['Has lanzado una flecha, pero has fallado'];
  }
}
