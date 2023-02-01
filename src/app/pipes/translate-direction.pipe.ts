import { Pipe, PipeTransform } from '@angular/core';

import { Orientation } from '../interfaces';

@Pipe({
  name: 'translateDirection'
})
export class TranslateDirectionPipe implements PipeTransform {
  transform(orientation: Orientation): string {
    switch (orientation) {
      case 'N':
        return 'keyboard_arrow_up'
      case 'S':
        return 'keyboard_arrow_down'
      case 'E':
        return 'keyboard_arrow_right';
      case 'W':
        return 'keyboard_arrow_left';
      default:
        return 'home';
    }
  }
}
