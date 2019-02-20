import { ComponentInitializator } from "./Component";

export class Entity {
    public id: number;
    public components: ComponentInitializator[];

    constructor(components: ComponentInitializator[]) {
        this.components = components;
    }
}