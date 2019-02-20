import { ComponentGroupMap, ComponentsGroup } from "./ComponentGroup";
import { ComponentsHash, getComponentsHash, getComponentsHashFromInitializators } from "./ComponentGroupHash";
import { ComponentConstructor, ComponentInitializator } from "./Component";
import { Entity } from "./Entity";

export class ComponentGroupRegistry {
    public componentsGroups: ComponentGroupMap = {};

    public get(components: ComponentConstructor[], hash?: ComponentsHash): ComponentsGroup {
        hash = hash || getComponentsHash(components);

        if (!this.componentsGroups[hash]) {
            this.componentsGroups[hash] = new ComponentsGroup(components);
        }

        return this.componentsGroups[hash];
    }

    public pushEntity(enntity: Entity, components: ComponentInitializator[]): void {
        const hash = getComponentsHashFromInitializators(components);
        for (const groupHash in this.componentsGroups) {
            if (this.componentsGroups[groupHash].matchHash(hash)) {
                this.componentsGroups[groupHash].pushEntity(enntity);
            }
        }
    }

    public removeComponentFromEntity(entity: Entity, component: ComponentConstructor): void {
        for (const groupHash in this.componentsGroups) {
            if (this.componentsGroups[groupHash].has(component)) {
                this.componentsGroups[groupHash].removeEntity(entity);
            }
        }
    }

    public removeEntity(entity: Entity): void {
        const hash = getComponentsHashFromInitializators(entity.components);
        for (const groupHash in this.componentsGroups) {
            if (this.componentsGroups[groupHash].matchHash(hash)) {
                this.componentsGroups[groupHash].removeEntity(entity);
            }
        }
    }
}