import { ComponentConstructor, ComponentInitializator } from './Component';
import { Entity } from './Entity';
import { componentHashHasComponent, getComponentsHash } from "./ComponentGroupHash";


export type ComponentsHash = number;


export class ComponentsGroup {
    public readonly entities: Entity[];
    public readonly hash: ComponentsHash;
    public readonly components: ComponentConstructor[];
    public onEntityAdded: ((entity: Entity) => void)[];
    public onEntityRemoved: ((entity: Entity) => void)[];

    constructor(components: ComponentConstructor[]) {
        this.hash = getComponentsHash(components);
        this.entities = [];
        this.components = components;
        this.onEntityAdded = [];
        this.onEntityRemoved = [];
    }


    public pushEntity(entity: Entity): void {
        for (const callback of this.onEntityAdded) {
            callback(entity);
        }
        this.entities.push(entity);
    }

    public match(components: ComponentConstructor[]): boolean {
        for (const comp of components) {
            if (!componentHashHasComponent(this.hash, comp)) {
                return false;
            }
        }
        return true;
    }

    public matchInitializators(components: ComponentInitializator[]): boolean {
        for (const comp of components) {
            if (!componentHashHasComponent(this.hash, comp.component)) {
                return false;
            }
        }
        return true;
    }

    public has(component: ComponentConstructor): boolean {
        return componentHashHasComponent(this.hash, component);
    }

    public removeEntity(entity: Entity): void {
        for (const callback of this.onEntityRemoved) {
            callback(entity);
        }

        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
    }
}

export type ComponentGroupMap = { [hash: number]: ComponentsGroup };