import { Orientation } from './orientation.type';

export interface Hero {
    orientation: Orientation;
    numOfHarrows: number;
    hasGold: boolean;
    row: number;
    col: number;
}
