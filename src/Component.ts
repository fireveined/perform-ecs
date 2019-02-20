export abstract class Component {
    static readonly _id: number = 0;
    static readonly id: number;
    public abstract reset(object: this, ...args: any[]): void;
}

export function makeComponent(constructor: any) {
    constructor.id = (<any>Component)._id++;
}

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export type EntityOf<T extends any> = NonFunctionProperties<T>;

export type ComponentConstructor = {
    new(): Component;
    id: number
}

export interface ComponentInitializator<T extends any = any> {
    component: T;
    args?: T['prototype']['reset'];
}
