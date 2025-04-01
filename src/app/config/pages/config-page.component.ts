import { GameService } from './../../services/game.service';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent {
  readonly boardSizeOptions = [4, 5, 6, 7, 8, 9];
  readonly numOfWells = [1, 2, 3, 4];
  readonly numOfHarrows = [1, 2, 3, 4, 5];

  configForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly gameService: GameService,
    private readonly router: Router
  ) {
    this.configForm = this.fb.group({
      boardSize: [4, [Validators.required]],
      numOfWells: [1, [Validators.required]],
      numOfHarrows: [5, [Validators.required]]
    })
  }

  sendForm(): void {
    if (this.configForm.invalid) {
      return;
    }

    const size = this.configForm.get('boardSize')?.value!;
    const numOfWells = this.configForm.get('numOfWells')?.value!;
    const numOfHarrows = this.configForm.get('numOfHarrows')?.value!;

    this.gameService.createGame(size, numOfWells, numOfHarrows);
    this.router.navigateByUrl('/game');
  }
}
