import { TestBed } from '@angular/core/testing';

import { GamePageGuard } from './game-page.guard';

describe('GamePageGuard', () => {
  let guard: GamePageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GamePageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
