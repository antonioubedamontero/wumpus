export type Enemy = 'well' | 'monster';

export interface Cell {
    hasHero: boolean;
    hasGold: boolean;
    enemies?: Enemy;
}
