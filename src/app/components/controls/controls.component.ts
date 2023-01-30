import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Action } from '../../interfaces/index';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  @Input() canExitEnter = false;
  @Output() actionEmmited = new EventEmitter<Action>();

  doAction(action: Action): void {
    this.actionEmmited.emit(action);
  }
}
