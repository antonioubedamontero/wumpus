import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Cell } from '../../interfaces/index';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: Cell[][] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.board = this.gameService.getBoard();
  }

  hasMonster(cell: Cell): boolean {
    return cell.enemies === 'monster';
  }

  hasWell(cell: Cell): boolean {
    return cell.enemies === 'well';
  }

  hasGold(cell: Cell): boolean {
    return cell.hasGold;
  }

  hasHero(cell: Cell): boolean {
    return cell.hasHero;
  }

  hasFootPrint(cell: Cell): boolean {
    return cell.hasBeenVisited && !(cell.enemies || cell.hasHero || cell.hasGold);
  }
}
