import { Cell, Hero } from '../../interfaces';
import { GameService } from './../../../services/game.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() showAllValue: boolean = false;
  @Input() hero!: Hero;

  board: Cell[][] = [];

  constructor(
    private readonly gameService: GameService
  ){}

  ngOnInit(): void {
    this.board = this.gameService.getBoard();
  }

  showMonster(cell: Cell, cellRow: number, cellCol: number): boolean {
    return cell.enemies?.type === 'monster' && (this.showAllValue || !cell.enemies.isAlive || (this.hero.row === cellRow && this.hero.col === cellCol));
  }

  showWell(cell: Cell, cellRow: number, cellCol: number): boolean {
    return cell.enemies?.type === 'well' && (this.showAllValue || (this.hero.row === cellRow && this.hero.col === cellCol));
  }

  showGold(cell: Cell, cellRow: number, cellCol: number): boolean {
    return cell.hasGold && (this.showAllValue || this.hero.hasGold || (this.hero.row === cellRow && this.hero.col === cellCol));
  }

  showHero(cell: Cell): boolean {
    return cell.hasHero;
  }

  showFootPrint(cell: Cell): boolean {
    return cell.hasBeenVisited && !(cell.enemies || cell.hasHero || cell.hasGold);
  }

  getDegrees(): number {
    switch (this.hero.orientation) {
      case 'N':
        return -90;
      case 'S':
        return 90;
      case 'E':
        return 0;
      case 'W':
        return 180;
      case 'None':
        return -90;
      default:
        throw Error('Missing orientation');
    }
  }
}
