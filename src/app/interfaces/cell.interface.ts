export type Enemy = 'well' | 'monster';

export interface Cell {
    hasHero: boolean;
    hasGold: boolean;
    hasBeenVisited: boolean;
    enemies?: Enemy;
}
