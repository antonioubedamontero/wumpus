export type Enemy = 'well' | 'monster';

export interface Cell {
    hasHero: boolean;
    enemies: Enemy[];
}
