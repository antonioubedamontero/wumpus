import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Action, Orientation, MovementResponse } from '../../interfaces/index';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  @Input() canExitEnter = false;
  @Input() currentDirection: Orientation = 'None';
  @Input() numOfHarrows: number = 5;
  @Output() movementResponseEmmited = new EventEmitter<MovementResponse>();

  doAction(action: Action): void {
    const additionalActions = ['throwArrow', 'goForward'];
    if (additionalActions.includes(action)) {
      this.movementResponseEmmited.emit(
        {
          orientation: this.currentDirection,
          additionalAction: action
        });
      return;
    }

    if (action === 'exitEnter') {
      const orientation = (this.currentDirection == 'None') ? 'N' : 'S';
      this.movementResponseEmmited.emit(
        {
          orientation,
          additionalAction: 'exitEnter'
        });
      return;
    }

    this.manageTurns(action);
  }

  private manageTurns(action: Action): void {
    const availablePoints: Orientation[] = ['N', 'E', 'S', 'W'];
    const indexElem = availablePoints.findIndex((value: string) => value === this.currentDirection); 1

    if (action === 'turnRight') {
      const orientation = (indexElem === availablePoints.length - 1) ? 'N' : availablePoints[indexElem + 1];
      this.movementResponseEmmited.emit({ orientation });
      return;
    }

    if (action === 'turnLeft') {
      const orientation = (indexElem === 0) ? 'W' : availablePoints[indexElem - 1];
      this.movementResponseEmmited.emit({ orientation });
      return;
    }
  }
}
