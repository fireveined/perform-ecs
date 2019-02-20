export interface ISystem {
    onEntityAdded?: (entity: any) => void;
    onEntityRemoved?: (entity: any) => void;

    update(dt: number): void;
}

