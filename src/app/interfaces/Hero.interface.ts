import { Orientation } from './orientation.type';

export interface Hero {
    orientation: Orientation;
    hasGold: boolean;
    row: number;
    col: number;
}
