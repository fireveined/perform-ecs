export abstract class Component {
    static readonly _id: number = 0;
    static readonly id: number;
    public abstract reset(object: this, ...args: any[]): void;
}

export function makeComponent(constructor: any) {
    constructor.id = (<any>Component)._id++;
}

export type ComponentConstructor = {
    new(): Component;
    id: number
}

export interface ComponentInitializator<T extends any = any> {
    component: T;
    args?: T['prototype']['reset'];
}
