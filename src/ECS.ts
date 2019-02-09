import { Component, ComponentConstructor, ComponentInitializator } from "./Component";
import { Entity } from "./Entity";
import { Archetype } from "./Archetype";
import { System } from "./System";
import { SystemRegistry } from "./SystemRegistry";
import { ComponentGroupRegistry } from "./ComponentGroupRegistry";

export class ECS {

    private _systemsRegistry: SystemRegistry;
    private _groupsRegistry: ComponentGroupRegistry;
    private _components: Component[] = [];

    constructor() {
        this._systemsRegistry = new SystemRegistry();
        this._groupsRegistry = new ComponentGroupRegistry();
    }

    public removeEntity(entity: Entity): void {

    }

    public removeComponentsFromEntity(entity: Entity, components: Component[] | Component): void {

    }

    public addComponentsToEntity(entity: Entity, components: Component[] | Component): void {

    }


    public registerSystem(system: System): void {
        this._systemsRegistry.register(system, this._groupsRegistry);
    }

    public update(dt: number): void {
        for (const system of this._systemsRegistry.systems) {
            system.update(dt);
        }
    }

    public createEntity: createEntityFunc = ((components: ComponentInitializator[]) => {
        const entity = new Entity();
        for (const component of components) {
            this._getComponentInstance(component.component).reset(entity as any, ...component.args);
        }

        this._groupsRegistry.pushEntity(entity, components);

        return entity as any;
    }) as any;

    private _getComponentInstance(component: ComponentConstructor): Component {
        if (component.id === undefined || !this._components[component.id]) {
            component.id = this._components.length;
            this._components[component.id] = new component();
        }
        return this._components[component.id];
    }

    public createArchetype(components: ComponentInitializator[]): Archetype {
        return components;
    }

}


type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
type ComponentOf<T extends ComponentInitializator> = NonFunctionProperties<T['component']['prototype']>;


type createEntityFunc = (<T extends ComponentInitializator,
    T2 extends ComponentInitializator,
    T3 extends ComponentInitializator,
    T4 extends ComponentInitializator,
    T5 extends ComponentInitializator,
    T6 extends ComponentInitializator,
    T7 extends ComponentInitializator,
    T8 extends ComponentInitializator,
    T9 extends ComponentInitializator,
    T10 extends ComponentInitializator>(comps: ComponentsInitList<T, T2, T3, T4, T5, T6, T7, T8, T9, T10>)
    => ComponentOf<T> & ComponentOf<T2> & ComponentOf<T3> & ComponentOf<T4> & ComponentOf<T5> & ComponentOf<T6>
    & ComponentOf<T7> & ComponentOf<T8> & ComponentOf<T9> & ComponentOf<T10>) ;


type ComponentsInitList<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> =
    Partial<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]> | { length: any } & {
    '0'?: T1;
    '1'?: T2;
    '2'?: T3;
    '3'?: T4;
    '4'?: T5;
    '5'?: T6;
    '6'?: T7;
    '7'?: T8;
    '8'?: T9;
    '9'?: T10;
}