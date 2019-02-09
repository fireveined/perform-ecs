import { ComponentGroupMap, ComponentsGroup } from "./ComponentGroup";
import { ComponentsHash, getComponentsHash } from "./ComponentGroupHash";
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
        for (const groupHash in this.componentsGroups) {
            if (this.componentsGroups[groupHash].matchInitializators(components)) {
                this.componentsGroups[groupHash].pushEntity(enntity);
            }
        }
    }

}